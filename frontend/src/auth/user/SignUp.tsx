import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignUpValidation } from "../../lib/validation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useCreateUser } from "../../lib/react-query/queries";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/User";
import InputErrorMessage from "../../components/InputErrorMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Loader2 } from "lucide-react";

// See SignIn for documentation
type UserFormData = z.infer<typeof SignUpValidation>;

const SignUp = () => {
  const { checkUserAuth, isAuthenticated, isLoading } = useUserContext();

  const { mutateAsync: registerUser, isPending: isRegisteringUser } =
    useCreateUser();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      contactNumber: "",
      email: "",
      password: "",
    },
  });

  const [phoneValue, setPhoneValue] = useState<string>("");

  const [isPassShow, setIsPassShow] = useState(false);

  if (isLoading) {
    return (
      <div className="flex-center gap-1 flex-grow">
        <Loader2 className="animate-spin" width={30} height={30} />
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) return <Navigate to="/user" />;

  async function onSubmit(data: UserFormData) {
    try {
      const newUser = await registerUser(data);

      toast.success(newUser.message);

      // Checks if the user is authenticated
      const isLoggedIn = await checkUserAuth();
      if (isLoggedIn) {
        navigate("/user");
        reset();
        setPhoneValue("");
      } else {
        toast.error("Sign Up failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        (error as any)?.response?.data?.message || "An unknown error occurred";

      // Use the errorMessage in toast
      toast.error(errorMessage);
    }
  }

  // Event handler for changing phone value
  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value || "");
    setValue("contactNumber", value || "");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      {/* Title and desc */}
      <div className="space-y-2">
        <h1 className="form-title">Sign Up</h1>
        <p className="form-desc">Please input valid credentials.</p>
      </div>

      <section className="form-field_container">
        {/* Name Field */}
        <section className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <Input
            type="text"
            id="name"
            className="h-10 px-3 focus-visible:ring-2"
            {...register("name")}
          />
          {errors.name && (
            <InputErrorMessage errorMessage={errors.name.message || ""} />
          )}
        </section>

        {/* Contact Number Field */}
        <section className="flex flex-col gap-1">
          <label htmlFor="contact" className="font-medium">
            Contact Number
          </label>
          <PhoneInput
            value={phoneValue}
            onChange={handlePhoneChange}
            defaultCountry="PH"
            withCountryCallingCode
            international
            countryCallingCodeEditable={false}
            className="PhoneInputInput"
          />
          {errors.contactNumber && (
            <InputErrorMessage
              errorMessage={errors.contactNumber.message || ""}
            />
          )}
        </section>

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
          <div className="flex">
            <Input
              type={isPassShow ? "text" : "password"}
              id="password"
              className="h-10 px-3 focus-visible:ring-2"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <InputErrorMessage errorMessage={errors.password.message || ""} />
          )}
        </section>
      </section>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="space-x-1 w-full max-w-[24rem] mx-auto"
        disabled={isRegisteringUser}
      >
        {isRegisteringUser ? (
          <>
            <Loader2 className="animate-spin" />
            <p>Loading...</p>
          </>
        ) : (
          "Sign Up"
        )}
      </Button>

      {/* Form Footer --ForgetPass/SignUp Route */}
      <footer className="form-footer_container">
        <p className="text-sm">Already have an account?</p>
        <Button type="button" size="sm" variant="link">
          <Link to="/sign-in">Sign In here.</Link>
        </Button>
      </footer>
    </form>
  );
};

export default SignUp;
