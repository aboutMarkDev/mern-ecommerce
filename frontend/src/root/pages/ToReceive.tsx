import UserOrderEmptyUI from "@/components/UserOrderEmptyUI";
import UserOrderListUI from "@/components/UserOrderListUI";
import { IProduct, OrderType } from "@/types/index.types";
import { useEffect, useState } from "react";

const ToReceive = ({ orderList }: { orderList: OrderType[] }) => {
  const [toReceive, setToReceive] = useState<IProduct[]>([]);

  useEffect(() => {
    getToReceive();
  }, [orderList]);

  const getToReceive = () => {
    let ordersCopy = orderList?.slice();

    const newToReceive: IProduct[] = [];

    ordersCopy?.forEach((order: OrderType) => {
      order.products.forEach((product: IProduct) => {
        if (product.productStatus === "toReceive") {
          newToReceive.push(product);
        }
      });
    });

    setToReceive(newToReceive);
  };

  return toReceive.length > 0 ? (
    <UserOrderListUI productList={toReceive} />
  ) : (
    <UserOrderEmptyUI />
  );
};

export default ToReceive;
