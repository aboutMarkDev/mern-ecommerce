import { Textarea } from "@/components/ui/textarea";
import { ProductEditValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Select, { SingleValue } from "react-select";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import SelectInput from "@/components/SelectInput";
import { categoryOptions, sizesOption, subCategoryOptions } from "@/constants";
import { IOption } from "@/types/index.types";
import {
  useEditProductById,
  useGetProductById,
} from "@/lib/react-query/queries";
import { Button } from "@/components/ui/button";
import InputErrorMessage from "@/components/InputErrorMessage";
import { toast } from "react-toastify";
import AdminHeader from "@/components/AdminHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

type ProductFormData = z.infer<typeof ProductEditValidation>;

const EditProduct = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("pid");

  const { data: product } = useGetProductById(productId || "");

  const { mutateAsync: editProduct, isPending: isEditingProductLoading } =
    useEditProductById(productId || "");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductEditValidation),
    values: {
      name: product?.name,
      desc: product?.description,
      price: product?.price,
      // variations: product?.variations,
    },
  });

  const [updatedPrice, setUpdatedPrice] = useState<string | undefined>("");

  const [updatedCategory, setUpdatedCategory] =
    useState<SingleValue<IOption>>(null);

  const [updatedSubCategory, setUpdatedSubCategory] =
    useState<SingleValue<IOption>>(null);

  const [updatedSizesOption, setUpdatedSizesOption] =
    useState<SingleValue<{ value: string[]; label: string }>>(null);

  useEffect(() => {
    if (product) {
      // //Default Value for Price
      setUpdatedPrice(product?.price || "");

      // Default Value Category
      const defaultCategory = categoryOptions.find(
        (item) => item.value === product?.category
      );
      if (defaultCategory) {
        setUpdatedCategory({ ...updatedCategory, ...defaultCategory });
      }

      // Default Value Subcategory
      const defaultSubCategory = subCategoryOptions.find(
        (item) => item.value === product?.subCategory
      );
      if (defaultSubCategory) {
        setUpdatedSubCategory({ ...updatedSubCategory, ...defaultSubCategory });
      }

      // Default Value for Size
      if (product?.size.length === 5) {
        const found = sizesOption.find((item) => item.label === "Clothes");
        setUpdatedSizesOption({
          value: found?.value || [],
          label: found?.label || "",
        });
      } else if (product?.size.length > 5) {
        const found = sizesOption.find((item) => item.label === "Sneakers");
        setUpdatedSizesOption({
          value: found?.value || [],
          label: found?.label || "",
        });
      } else {
        const found = sizesOption.find((item) => item.label === "N/A");
        setUpdatedSizesOption({
          value: found?.value || [],
          label: found?.label || "",
        });
      }
    }
  }, [product, productId]);

  async function onSubmit(data: ProductFormData) {
    const myData = {
      updatedName: data.name,
      updatedDescription: data.desc,
      updatedPrice: updatedPrice || "",
      updatedCategory: updatedCategory?.value || "",
      updatedSubcategory: updatedSubCategory?.value || "",
      updatedSizes: updatedSizesOption?.value || [],
    };

    console.log(myData);

    try {
      const updatedProduct = await editProduct(myData);
      navigate("/admin");
      toast.success(updatedProduct.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="border h-full rounded-md flex flex-col gap-1 pb-3">
      <AdminHeader title="Edit Product" />

      {/* BUG HERE NOT THE FORM IS NOT RESPONSIVE */}
      <ScrollArea>
        <form
          className="w-full max-w-4xl mx-auto px-5 flex-center flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <section className="flex flex-col gap-1 w-full max-w-xl mx-auto">
            <label htmlFor="name" className="font-medium text-sm">
              Name (Product name: Color/Variation)
            </label>
            <input
              type="text"
              id="name"
              className="border px-3 h-[38px] rounded-md w-full text-sm"
              {...register("name")}
            />
            {errors.name && (
              <InputErrorMessage errorMessage={errors.name.message || ""} />
            )}
          </section>

          {/* Description */}
          <section className="flex flex-col gap-1 w-full max-w-xl mx-auto">
            <label className="font-medium text-sm">Description</label>
            <Textarea
              placeholder="Add description..."
              className="h-40"
              {...register("desc")}
            />
            {errors.desc && (
              <InputErrorMessage errorMessage={errors.desc.message || ""} />
            )}
          </section>

          {/* Price */}
          <section className="flex flex-col gap-1 w-full max-w-xl mx-auto">
            <label htmlFor="updatedPrice" className="font-medium text-sm">
              Price
            </label>
            <CurrencyInput
              id="updatedPrice"
              onValueChange={(value: string | undefined) => {
                setUpdatedPrice(value);
              }}
              value={updatedPrice}
              decimalSeparator="."
              groupSeparator=","
              allowNegativeValue={false}
              disableGroupSeparators={false}
              intlConfig={{ locale: "en-PH", currency: "PHP" }}
              placeholder="(e.g., ₱123.00)"
              className="border h-[38px] rounded-md px-3 text-sm"
            />
            {errors.price && (
              <InputErrorMessage errorMessage={errors.price.message || ""} />
            )}
          </section>

          {/* Category */}
          <section className="flex flex-col gap-1 w-full max-w-xl mx-auto">
            <label htmlFor="category" className="font-medium text-sm">
              Category
            </label>
            <SelectInput
              options={categoryOptions}
              value={updatedCategory}
              setValue={setUpdatedCategory}
            />
          </section>

          {/* SubCategory */}
          <section className="flex flex-col gap-1 w-full max-w-xl mx-auto">
            <label htmlFor="category" className="font-medium text-sm">
              Subcategory
            </label>
            <SelectInput
              options={subCategoryOptions}
              value={updatedSubCategory}
              setValue={setUpdatedSubCategory}
            />
          </section>

          {/* Sizes */}
          <section className="flex flex-col gap-1 w-full max-w-xl mx-auto">
            <label htmlFor="category" className="font-medium text-sm">
              Sizes
            </label>
            <Select
              value={updatedSizesOption}
              className="text-sm"
              onChange={(
                option: SingleValue<{ value: string[]; label: string }>
              ) => setUpdatedSizesOption(option)}
              options={sizesOption}
              isClearable
              isSearchable
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary25: "lightGray",
                  primary50: "silver",
                  primary: "black",
                },
              })}
            />
          </section>

          <div className="flex gap-3 w-full max-w-xl justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isEditingProductLoading}
              className="space-x-1"
            >
              {isEditingProductLoading ? (
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
      </ScrollArea>
    </main>
  );
};

export default EditProduct;
