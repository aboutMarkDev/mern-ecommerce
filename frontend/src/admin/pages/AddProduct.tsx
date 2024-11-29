import AdminHeader from "@/components/AdminHeader";
import InputErrorMessage from "@/components/InputErrorMessage";
import ProductImageUploader from "@/components/ProductImageUploader";
import ProductVariationsUploader from "@/components/ProductVariationsUploader";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { categoryOptions, sizesOption, subCategoryOptions } from "@/constants";
import { useAddProduct } from "@/lib/react-query/queries";
import { ProductAddValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import { toast } from "react-toastify";
import { z } from "zod";

type ProductData = z.infer<typeof ProductAddValidation>;

interface ISizeOption {
  label: string;
  value: string[];
}

interface IOption {
  label: string;
  value: string;
}

const AddProduct = () => {
  const navigate = useNavigate();

  const { mutateAsync: addProduct, isPending: isAddingProductLoading } =
    useAddProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProductData>({
    resolver: zodResolver(ProductAddValidation),
    defaultValues: {
      productImage: null,
      productVariations: null,
      name: "",
      desc: "",
      price: "",
      // sizes: [],
      // category: "",
      // subcategory: "",
      // variationsName: [],
    },
  });

  const [size, setSize] = useState<SingleValue<ISizeOption>>(null);

  const [category, setCategory] = useState<SingleValue<IOption>>(null);

  const [subCategory, setSubCategory] = useState<SingleValue<IOption>>(null);

  const [inputs, setInputs] = useState<string[]>([]);

  // Add a new empty input value when clicking the Add button
  const addInput = () => setInputs([...inputs, ""]);

  // Remove the last input when clicking the Remove button
  const removeInput = () => setInputs(inputs.slice(0, -1));

  // Handle input value change
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  async function onSubmit(data: ProductData) {
    // For not including the peso sign when submitting the form
    const priceVal = (price: string) => {
      return price.slice(1);
    };

    const productFormData = new FormData();
    productFormData.append("imageUrl", data.productImage as File);
    data.productVariations?.forEach((file) => {
      productFormData.append("varImgUrls", file);
    }),
      productFormData.append("name", data.name);
    productFormData.append("description", data.desc);
    productFormData.append("price", priceVal(data.price));

    productFormData.append(
      "size",
      size?.value ? JSON.stringify(size.value) : ""
    );
    productFormData.append(
      "category",
      category?.value ? JSON.stringify(category.value) : ""
    );
    productFormData.append(
      "subCategory",
      subCategory?.value ? JSON.stringify(subCategory.value) : ""
    );
    // productFormData.append("variationsName", inputs);
    productFormData.append("variationsName", JSON.stringify(inputs));

    for (const [key, value] of productFormData) {
      console.log(`${key}: ${value}`);
    }

    try {
      const productData = await addProduct(productFormData);
      navigate("/admin");
      toast.success(productData.message);
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || "An unknown error occurred";

      // Use the errorMessage in toast
      toast.error(errorMessage);
    }
  }

  return (
    <div className="border h-full rounded-md flex flex-col gap-3 pb-3">
      <AdminHeader title="Add Product" />

      {/* overflow-y-auto */}
      <ScrollArea className="w-full max-w-7xl mx-auto">
        <form
          className="flex flex-col px-5 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Product Image Uploader */}
          <section className="w-full h-[150px] max-w-3xl mx-auto">
            <Controller
              name="productImage"
              control={control}
              render={({ field: { onChange } }) => (
                <ProductImageUploader fieldOnChange={onChange} />
              )}
            />
          </section>

          {/* Product Name */}
          <section className="w-full max-w-3xl mx-auto flex flex-col gap-1">
            <label htmlFor="" className="text-sm font-medium">
              Name (Product name: Color/Variation)
            </label>
            <input
              type="text"
              className="border rounded-md h-[38px] px-3 text-sm w-full"
              {...register("name")}
              placeholder="(e.g., Men T-shirt Blue)"
            />
            {errors.name && (
              <InputErrorMessage errorMessage={errors.name.message || ""} />
            )}
          </section>

          {/* Description */}
          <section className="w-full max-w-3xl mx-auto flex flex-col gap-1">
            <label htmlFor="" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              placeholder="Add description..."
              className="h-40"
              {...register("desc")}
            />
            {errors.desc && (
              <InputErrorMessage errorMessage={errors.desc.message || ""} />
            )}
          </section>

          {/* Price and Size */}
          <section className="w-full max-w-3xl mx-auto flex max-lg:flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="price" className="text-sm font-medium">
                Price
              </label>
              <CurrencyInput
                id="price"
                {...register("price")}
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
            </div>
            <div className="w-full">
              <label htmlFor="" className="text-sm font-medium">
                Size
              </label>
              <Select
                value={size}
                className="text-sm"
                onChange={(option: SingleValue<ISizeOption>) => setSize(option)}
                options={sizesOption}
                placeholder="Select Sizes..."
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
            </div>
          </section>

          {/* Category and SubCategory */}
          <section className="w-full max-w-3xl mx-auto flex max-lg:flex-col gap-2">
            <div className="w-full">
              <label htmlFor="" className="text-sm font-medium">
                Category
              </label>
              <SelectInput
                options={categoryOptions}
                value={category}
                placeholder="Select Category..."
                setValue={setCategory}
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="text-sm font-medium">
                Subcategory
              </label>
              <SelectInput
                options={subCategoryOptions}
                value={subCategory}
                placeholder="Select Subcategory..."
                setValue={setSubCategory}
              />
            </div>
          </section>

          {/* VariationsImages */}
          <section className="w-full h-[150px] max-w-3xl mx-auto flex-center flex-col">
            <Controller
              name="productVariations"
              control={control}
              render={({ field: { onChange } }) => (
                <ProductVariationsUploader
                  mediaUrl={[]}
                  fieldOnChange={onChange}
                />
              )}
            />
          </section>

          {/* Variation Names */}
          <section className="w-full max-w-3xl mx-auto flex flex-col gap-2">
            <h1 className="text-sm font-medium">
              Variations name{" "}
              <span className="text-gray-500">
                (Add names as many as variations images do you have)
              </span>
            </h1>

            <div className="flex gap-1">
              <Button
                size="sm"
                type="button"
                className="rounded-full"
                onClick={addInput}
              >
                Add
              </Button>
              <Button
                size="sm"
                type="button"
                className="rounded-full"
                onClick={removeInput}
              >
                Remove
              </Button>
            </div>

            {inputs.map((inputValue, index) => (
              <div key={index}>
                <input
                  id={`input-${index}`}
                  type="text"
                  value={inputValue}
                  placeholder={`Variation ${index + 1}`}
                  className="border rounded-md h-8 text-sm px-3"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
            ))}
          </section>

          <footer className="w-full max-w-3xl mx-auto flex items-center justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isAddingProductLoading}
              className="space-x-1"
            >
              {isAddingProductLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p>Loading...</p>
                </>
              ) : (
                "Create"
              )}
            </Button>
          </footer>
        </form>
      </ScrollArea>
    </div>
  );
};

export default AddProduct;
