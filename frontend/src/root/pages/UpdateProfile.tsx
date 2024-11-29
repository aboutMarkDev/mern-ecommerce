import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/User";
import UserAvatarUploader from "../../components/UserAvatarUploader";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserValidation } from "../../lib/validation";
import { z } from "zod";
import { useUpdateUserById } from "../../lib/react-query/queries";
import { toast } from "react-toastify";
import InputErrorMessage from "../../components/InputErrorMessage";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type UpdateUserData = z.infer<typeof UpdateUserValidation>;

const UpdateProfile = () => {
  const { user, isAuthenticated, isLoading, setUser } = useUserContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("uid");

  const navigate = useNavigate();

  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUserById(
    productId || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateUserData>({
    resolver: zodResolver(UpdateUserValidation),
    values: {
      file: null,
      name: user?.name || "",
      email: user?.email || "",
      contactNumber: user?.contactNumber || "",
    },
  });

  if (isLoading) {
    return (
      <div className="flex-center gap-1 flex-grow">
        <Loader2 className="animate-spin" width={30} height={30} />
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/sign-in" />;

  async function onSubmit(data: UpdateUserData) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contactNumber", data.contactNumber);
    formData.append("imageUrl", data.file as File);

    // for (const [key, value] of formData) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      const updatedUser = await updateUser(formData);

      setUser({
        ...user,
        name: updatedUser.name,
        email: updatedUser.email,
        contactNumber: updatedUser.contactNumber,
        imageUrl: updatedUser.imageUrl,
      });
      navigate("/user");
      toast.success("User update successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="w-full max-w-7xl mx-auto flex flex-col gap-5 px-5 justify-center">
      <section className="flex items-center gap-3">
        <button
          className="rounded-full hover:bg-[#e6e5e5] transition duration-200 delay-75 p-1"
          onClick={() => navigate(-1)}
        >
          <img
            src="/assets/icons/arrow-small-left.svg"
            alt="back"
            width={26}
            height={26}
          />
        </button>

        <h1 className="text-2xl font-semibold">Update Profile</h1>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 pb-5 w-full"
      >
        {/* Avatar Uploader Field */}
        <section className="w-full max-w-xl mx-auto">
          <div className="flex-center h-[7rem]">
            <Controller
              name="file"
              control={control}
              render={({ field: { onChange } }) => (
                <UserAvatarUploader
                  mediaUrl={user?.imageUrl || "/assets/person.png"}
                  fieldOnChange={onChange} // Pass the form's onChange handler to update file value
                />
              )}
            />
          </div>
        </section>

        {/* Name Field */}
        <section className="flex-center flex-col text-sm">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              className="border h-10 rounded-md px-5"
            />
            {errors.name && (
              <InputErrorMessage errorMessage={errors.name.message || ""} />
            )}
          </div>
        </section>

        {/* Email Field */}
        <section className="flex-center flex-col text-sm">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Email</label>
            <input
              type="text"
              {...register("email")}
              className="border h-10 rounded-md px-5"
            />
            {errors.email && (
              <InputErrorMessage errorMessage={errors.email.message || ""} />
            )}
          </div>
        </section>

        {/* Contact Number */}
        <section className="flex-center flex-col text-sm">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Contact Number</label>
            <input
              type="text"
              {...register("contactNumber")}
              className="border h-10 rounded-md px-5"
            />
            {errors.contactNumber && (
              <InputErrorMessage
                errorMessage={errors.contactNumber.message || ""}
              />
            )}
          </div>
        </section>

        <footer className="flex-center">
          <div className="w-full max-w-[15rem] flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating} className="space-x-1">
              {isUpdating ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p>Loading...</p>
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </footer>
      </form>
    </main>
  );
};

export default UpdateProfile;
