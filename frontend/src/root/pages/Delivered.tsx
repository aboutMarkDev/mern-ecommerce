import UserOrderEmptyUI from "@/components/UserOrderEmptyUI";
import UserOrderListUI from "@/components/UserOrderListUI";
import { IProduct, OrderType } from "@/types/index.types";
import { useEffect, useState } from "react";

const Delivered = ({ orderList }: { orderList: OrderType[] }) => {
  const [delivered, setDelivered] = useState<IProduct[]>([]);

  useEffect(() => {
    filter();
  }, [orderList]);

  const filter = () => {
    let ordersCopy = orderList?.slice();

    const newDelivered: IProduct[] = [];

    ordersCopy?.forEach((order: OrderType) => {
      order.products.forEach((product: IProduct) => {
        if (product.productStatus === "delivered") {
          newDelivered.push(product);
        }
      });
    });

    setDelivered(newDelivered);
  };

  return delivered.length > 0 ? (
    <UserOrderListUI productList={delivered} />
  ) : (
    <UserOrderEmptyUI />
  );
};

export default Delivered;
