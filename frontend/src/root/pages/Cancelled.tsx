import UserOrderEmptyUI from "@/components/UserOrderEmptyUI";
import UserOrderListUI from "@/components/UserOrderListUI";
import { IProduct, OrderType } from "@/types/index.types";
import { useEffect, useState } from "react";

const Cancelled = ({ orderList }: { orderList: OrderType[] }) => {
  const [cancelled, setCancelled] = useState<IProduct[]>([]);

  useEffect(() => {
    filter();
  }, [orderList]);

  const filter = () => {
    let ordersCopy = orderList?.slice();

    const newCancelled: IProduct[] = [];

    ordersCopy?.forEach((order: OrderType) => {
      order.products.forEach((product: IProduct) => {
        if (product.productStatus === "cancelled") {
          newCancelled.push(product);
        }
      });
    });

    setCancelled(newCancelled);
  };

  return cancelled.length > 0 ? (
    <UserOrderListUI productList={cancelled} />
  ) : (
    <UserOrderEmptyUI />
  );
};

export default Cancelled;
