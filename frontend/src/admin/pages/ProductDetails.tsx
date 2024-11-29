import AdminHeader from "@/components/AdminHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetProductById } from "@/lib/react-query/queries";
import { useLocation } from "react-router-dom";

const defaultDesc =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, corporis dolore autem quasi, suscipit, laudantium sunt asperiores quia nesciunt sed at odio corrupti illo assumenda. Rem quod sequi dolor debitis.";

const priceFormatted = (priceParam: string) => {
  const price = parseFloat(priceParam);
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};
const ProductDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("pid");

  const { data: product } = useGetProductById(productId || "");

  return (
    <main className="border h-full rounded-md flex flex-col gap-3 pb-3">
      <AdminHeader title="Product Details" />

      <div className="border rounded-lg w-[20rem] h-[20rem] max-md:w-[14rem] max-md:h-[14rem] mx-auto overflow-hidden">
        <img
          src={product?.imageUrl}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <ScrollArea>
        <section className="flex-center mx-3 px-5">
          <div className="border rounded-md overflow-hidden">
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <th className="px-2 text-sm py-3 text-center border-r border-b text-gray-500">
                    ID
                  </th>
                  <td className="px-2 text-sm py-3 text-center border-b border-l ">
                    {product?.id}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 text-sm py-3 text-center border-r border-b text-gray-500">
                    Name
                  </th>
                  <td className="px-2 text-sm py-3 text-center border-l border-b ">
                    {product?.name}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 text-sm py-3 text-center border-r border-b text-gray-500">
                    Description
                  </th>
                  <td className="px-2 text-sm py-3 text-center border-l border-b w-[900px]">
                    {product?.description || defaultDesc}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 text-sm py-3 text-center border-r border-b text-gray-500">
                    Price
                  </th>
                  <td className="px-2 text-sm py-3 text-center border-l border-b">
                    {priceFormatted(product?.price)}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 text-sm py-3 text-center border-r border-b text-gray-500">
                    Category
                  </th>
                  <td className="px-2 text-sm py-3 text-center border-l border-b">
                    {product?.category}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 text-sm py-3 text-center border-r border-b text-gray-500">
                    Subcategory
                  </th>
                  <td className="px-2 text-sm py-3 text-center border-l border-b">
                    {product?.subCategory}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 text-sm py-3 text-center border-r border-b text-gray-500">
                    Sizes
                  </th>
                  <td className="px-2 text-sm py-3 text-center border-l border-b">
                    {product?.size.length > 0
                      ? product?.size.toString()
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 text-sm py-3 text-center border-r text-gray-500">
                    Variations
                  </th>
                  <td className="px-2 text-sm py-3 text-center flex-center gap-3">
                    {product?.variations.map(
                      (item: { name: string; imageUrl: string }) => {
                        const variation = item.name.split(" ").pop();
                        return <p key={item.name}>{variation}</p>;
                      }
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </ScrollArea>
    </main>
  );
};

export default ProductDetails;
