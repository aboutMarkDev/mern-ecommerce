import UserOrderEmptyUI from "@/components/UserOrderEmptyUI";
import UserOrderListUI from "@/components/UserOrderListUI";
import { IProduct, OrderType } from "@/types/index.types";
import { useEffect, useState } from "react";

const ToPay = ({ orderList }: { orderList: OrderType[] }) => {
  const [toPays, setToPays] = useState<IProduct[]>([]);

  useEffect(() => {
    filters();
  }, [orderList]);

  const filters = () => {
    let ordersCopy = orderList?.slice();

    const newToPays: IProduct[] = [];

    ordersCopy?.forEach((order: OrderType) => {
      order.products.forEach((product: IProduct) => {
        if (product.productStatus === "toPay") {
          newToPays.push(product);
        }
      });
    });

    setToPays(newToPays);
  };

  return toPays.length > 0 ? (
    <UserOrderListUI productList={toPays} />
  ) : (
    <UserOrderEmptyUI />
  );
};

export default ToPay;
