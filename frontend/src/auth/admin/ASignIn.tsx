import { Navigate, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/Admin";
import { useSignInAdmin } from "../../lib/react-query/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdminSignInValidation } from "../../lib/validation";
import { toast } from "react-toastify";
import InputErrorMessage from "../../components/InputErrorMessage";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AdminFormData = z.infer<typeof AdminSignInValidation>;

const ASignIn = () => {
  const { checkAdminAuth, isLoading, isAdminAuthenticated } = useAdminContext();

  if (isAdminAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const { mutateAsync: signInAdmin, isPending: isAdminSigningIn } =
    useSignInAdmin();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminFormData>({
    resolver: zodResolver(AdminSignInValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: AdminFormData) {
    try {
      const adminSignIn = await signInAdmin(data);

      toast.success(adminSignIn.message);

      const isAdminLoggedIn = await checkAdminAuth();
      if (isAdminLoggedIn) {
        navigate("/admin");
        reset();
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

  return isLoading ? (
    <div className="h-screen flex-center gap-1">
      <Loader2 className="animate-spin" width={40} height={40} />
      <p className="text-xl font-bold">Loading...</p>
    </div>
  ) : (
    <section className="min-h-screen flex-center overflow-auto">
      <form
        className="w-full max-w-2xl mx-auto flex-center gap-10 flex-col py-5 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button
          variant="ghost"
          type="button"
          size="icon"
          className="rounded-full"
          onClick={() => navigate("/sign-in")}
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-bold">Welcome back, Admin!</h1>
          <h3 className="text-gray-500 font-light italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
        </div>

        <section className="w-full max-w-sm mx-auto flex flex-col gap-5">
          <section className="flex flex-col gap-1">
            <label className="font-medium">Username</label>
            <Input
              type="text"
              className="h-10 px-3 focus-visible:ring-2"
              {...register("username")}
            />
            {errors.username && (
              <InputErrorMessage errorMessage={errors.username.message || ""} />
            )}
          </section>

          <section className="flex flex-col gap-1">
            <label className="font-medium">Password</label>
            <Input
              type="password"
              className="h-10 px-3 focus-visible:ring-2"
              {...register("password")}
            />
            {errors.password && (
              <InputErrorMessage errorMessage={errors.password.message || ""} />
            )}
          </section>
        </section>

        <footer className="flex flex-col gap-1 w-full max-w-sm mx-auto">
          <Button
            type="submit"
            size="lg"
            disabled={isAdminSigningIn}
            className="space-x-1"
          >
            {isAdminSigningIn ? (
              <>
                <Loader2 className="animate-spin" />
                <p>Loading...</p>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </footer>
      </form>
    </section>
  );
};

export default ASignIn;
