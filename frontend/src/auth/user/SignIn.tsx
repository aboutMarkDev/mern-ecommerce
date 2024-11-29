import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignInValidation } from "../../lib/validation";
import { useUserContext } from "../../context/User";
import { toast } from "react-toastify";
import { useLoginUser } from "../../lib/react-query/queries";
import InputErrorMessage from "../../components/InputErrorMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Loader2 } from "lucide-react";

/**
 * Defines the structure of the user form data, inferred from the `SignInValidation` schema.
 *
 * The `z.infer` utility is used to extract the TypeScript type from the Zod schema (`SignInValidation`),
 * ensuring that the `UserFormData` type always matches the validation rules defined in the schema.
 *
 * This type is typically used for handling form submissions, ensuring that the data adheres
 * to the validation requirements set in the schema.
 */
type UserFormData = z.infer<typeof SignInValidation>;

const SignIn = () => {
  /**
   * - `checkUserAuth`: An asynchronous function to check user authentication.
   * - `isLoading`: A boolean indicating if the authentication check is in progress.
   * - `isAuthenticated`: A boolean representing whether the user is authenticated.
   */
  const { checkUserAuth, isLoading, isAuthenticated } = useUserContext();

  /**
   * Hook for logging in the user using React Query.
   *
   * The `loginUser` function is an asynchronous mutation function that triggers the
   * login process. It returns a promise that resolves with the user data upon
   * successful login or rejects with an error if the login fails.
   *
   * The `isUserLoggingIn` boolean indicates whether the login request is currently pending.
   *
   * @returns {Object} An object containing:
   * - `loginUser`: A function to perform the login operation asynchronously.
   * - `isUserLoggingIn`: A boolean indicating if the login process is currently pending.
   */
  const { mutateAsync: loginUser, isPending: isUserLoggingIn } = useLoginUser();

  /**
   * Initializes the form for user sign-in using React Hook Form and Zod validation.
   *
   * The `useForm` hook is configured with the `UserFormData` type and the Zod
   * resolver for validating form inputs according to the `SignInValidation` schema.
   *
   * - `register`: A function that registers input components into the form, allowing
   *   React Hook Form to track their values and validation status.
   * - `handleSubmit`: A function that handles the form submission, invoking the provided
   *   submission handler only if the form is valid.
   * - `errors`: An object containing any validation errors for the form fields.
   * - `reset`: A function to reset the form fields to their default values.
   *
   * Default values for the form fields are set to empty strings for `email` and `password`.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // A function from React Router that can be called to navigate to a different route
  const navigate = useNavigate();

  // A local state for indicating if the password is shown or hidden.
  const [isPassShow, setIsPassShow] = useState(false);

  // Returns the Loader component if the authentication check is in progress
  if (isLoading) {
    return (
      <div className="flex-center gap-1 flex-grow">
        <Loader2 className="animate-spin" width={30} height={30} />
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // Redirects the user to the "/user" route if they are authenticated.
  if (isAuthenticated) return <Navigate to="/user" />;

  // Async func for submitting the data or userformdata in order to login
  async function onSubmit(data: UserFormData) {
    try {
      const signInUser = await loginUser(data);

      // If signInUser is success run the other code below.
      toast.success(signInUser.message);

      // Checks if the user is authenticated, returns a boolean.
      const isUserLoggedIn = await checkUserAuth();
      if (isUserLoggedIn) {
        navigate("/user");
        reset();
      } else {
        toast.error("Sign In failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || "An unknown error occurred";

      // Use the errorMessage in toast
      toast.error(errorMessage);
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      {/* Title and desc */}
      <div className="space-y-2">
        <h1 className="form-title">Sign In</h1>
        <p className="form-desc">Please input valid credentials.</p>
      </div>

      <section className="form-field_container">
        {/* Email Field */}
        <section className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <Input
            type="email"
            id="email"
            className="h-10 px-3 focus-visible:ring-2"
            {...register("email")}
          />
          {errors.email && (
            <InputErrorMessage errorMessage={errors.email.message || ""} />
          )}
        </section>

        {/* Password Field */}
        <section className="flex flex-col gap-1">
          <div className="flex-between">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <Button
              type="button"
              size="icon"
              className="rounded-full"
              variant="ghost"
              tabIndex={-1}
              onClick={() => setIsPassShow(!isPassShow)}
            >
              {isPassShow ? <EyeClosed /> : <Eye />}
            </Button>
          </div>
          <Input
            type={isPassShow ? "text" : "password"}
            id="password"
            className="h-10 px-3 focus-visible:ring-2"
            {...register("password")}
          />
          {errors.password && (
            <InputErrorMessage errorMessage={errors.password.message || ""} />
          )}
        </section>
      </section>
      <Button
        type="submit"
        size="lg"
        disabled={isUserLoggingIn}
        className="space-x-1 w-full max-w-[24rem] mx-auto"
      >
        {isUserLoggingIn ? (
          <>
            <Loader2 className="animate-spin" />
            <p>Loading...</p>
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Form Footer --ForgetPass/SignUp Route */}
      <footer className="form-footer_container">
        <div className="flex items-center">
          <p className="text-sm">Don't have an account?</p>
          <Button type="button" size="sm" variant="link">
            <Link to="/sign-up">Sign Up here.</Link>
          </Button>
        </div>
        <Button type="button" size="sm" variant="link">
          <Link to="/admin">Admin</Link>
        </Button>
      </footer>
    </form>
  );
};

export default SignIn;
