import AdminHeader from "@/components/AdminHeader";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Button } from "@/components/ui/button";
import UserAvatarUploader from "@/components/UserAvatarUploader";
import { useAdminContext } from "@/context/Admin";
import { useUpdateAdminProfile } from "@/lib/react-query/queries";
import { AdminUpdateValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

type UpdateAdminData = z.infer<typeof AdminUpdateValidation>;

const AUpdateProfile = () => {
  const navigate = useNavigate();

  const { admin, setAdmin } = useAdminContext();

  const { mutateAsync: updateAdmin, isPending: isUpdatingAdminLoading } =
    useUpdateAdminProfile(admin.id || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateAdminData>({
    resolver: zodResolver(AdminUpdateValidation),
    values: {
      imageUrl: null,
      username: admin?.username,
      email: admin?.email,
      // password: "",
    },
  });

  async function onSubmit(values: UpdateAdminData) {
    const adminData = new FormData();
    adminData.append("username", values.username);
    adminData.append("email", values.email);
    adminData.append("imageUrl", values.imageUrl as File);

    try {
      const updatedAdmin = await updateAdmin(adminData);

      setAdmin({
        ...admin,
        username: updatedAdmin.username,
        email: updatedAdmin.email,
        imageUrl: updatedAdmin.imageUrl,
      });
      toast.success(updatedAdmin.message);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="border h-full rounded-md flex flex-col gap-1 pb-3">
      <AdminHeader title="Update Admin Profile" />

      <form
        className="w-full max-w-4xl mx-auto flex-center flex-col gap-3 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Image Uploader */}
        <section className="w-full max-w-xl mx-auto">
          <div className="flex-center h-[120px]">
            <Controller
              name="imageUrl"
              control={control}
              render={({ field: { onChange } }) => (
                <UserAvatarUploader
                  mediaUrl={admin?.imageUrl || "/assets/person.png"}
                  fieldOnChange={onChange} // Pass the form's onChange handler to update file value
                />
              )}
            />
          </div>
        </section>

        {/* Username */}
        <section className="flex flex-col gap-1 w-full max-w-xl mx-auto">
          <label htmlFor="name" className="font-medium text-sm">
            Username
          </label>
          <input
            type="text"
            id="name"
            className="border px-3 h-[38px] rounded-md w-full text-sm"
            {...register("username")}
          />
          {errors.username && (
            <InputErrorMessage errorMessage={errors.username.message || ""} />
          )}
        </section>

        {/* Email */}
        <section className="flex flex-col gap-1 w-full max-w-xl mx-auto">
          <label htmlFor="name" className="font-medium text-sm">
            Email
          </label>
          <input
            type="text"
            id="name"
            className="border px-3 h-[38px] rounded-md w-full text-sm"
            {...register("email")}
          />
          {errors.email && (
            <InputErrorMessage errorMessage={errors.email.message || ""} />
          )}
        </section>

        <div className="flex gap-3 w-full max-w-xl justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isUpdatingAdminLoading}
            className="space-x-1"
          >
            {isUpdatingAdminLoading ? (
              <>
                <Loader2 className="animate-spin" />
                <p>Loading...</p>
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AUpdateProfile;
