import { IProduct } from "@/types/index.types";
import { formatPrice } from "@/utils";
import { useState } from "react";
import { Button } from "./ui/button";

const UserOrderListUI = ({ productList }: { productList: IProduct[] }) => {
  const [isProductName, setIsProductName] = useState<string[]>([]);

  const removeProductInArray = (productName: string) => {
    let copyArray = isProductName.slice();

    if (isProductName.length > 0) {
      copyArray = copyArray.filter((item) => item !== productName);
    }
    setIsProductName(copyArray);
  };

  return (
    <div className="flex items-start justify-center flex-wrap gap-3">
      {productList.map((product) => (
        <div
          key={product.name}
          className="border w-full max-w-[14rem] rounded-md flex items-center flex-col font-medium"
        >
          <h1 className="text-sm border-b w-full text-center py-2 px-3 whitespace-nowrap overflow-hidden text-ellipsis">
            {product.name}
          </h1>

          <div className="w-full h-[14rem] overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain shrink-0"
            />
          </div>

          <div className="w-full border-t py-2 text-sm space-y-1">
            <div className="flex-between px-3">
              <p>Price: {formatPrice(product.price)}</p>
              <p>Qty: {product.quantity}</p>
            </div>

            {/* If product name is in ProductName State show all of product details, otherwise just show the price and quantity above. */}
            {isProductName.includes(product.name) ? (
              <div className="px-3 flex flex-col gap-1">
                {product.size && <p>Size: {product.size}</p>}

                <p className="">ETA: {product.deliveryOption.date}</p>

                <p className="">
                  Shipping Fee:{" "}
                  {product.deliveryOption.fee === 0
                    ? "FREE"
                    : formatPrice(String(product.deliveryOption.fee))}
                </p>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="opacity-80"
                    // className="text-xs cursor-pointer hover:underline text-red-500"
                    onClick={() => removeProductInArray(product.name)}
                  >
                    Show less
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="opacity-80"
                  // className="text-xs px-3 cursor-pointer text-blue-500 hover:underline"
                  onClick={() =>
                    setIsProductName([...isProductName, product.name])
                  }
                >
                  Show more...
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrderListUI;
