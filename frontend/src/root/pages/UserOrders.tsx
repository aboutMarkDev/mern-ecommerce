import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import UserOrderEmptyUI from "@/components/UserOrderEmptyUI";
import { orderStatus } from "@/constants";
import { OrderType } from "@/types/index.types";
import {
  capitalStatus,
  formatPrice,
  orderIndicator,
  productStatusBadge,
} from "@/utils";
import { Loader2, MapPinIcon } from "lucide-react";

type UserOrdersProps = {
  orderList: OrderType[];
  isOrderLoading: boolean;
};

const UserOrders = ({ orderList, isOrderLoading }: UserOrdersProps) => {
  return isOrderLoading ? (
    <div className="flex-center gap-1">
      <Loader2 className="animate-spin" width={22} height={22} />
      <p className="text-md font-medium">Loading...</p>
    </div>
  ) : orderList?.length > 0 ? (
    <section className="space-y-3">
      <div className="flex-center space-x-2 text-sm text-gray-600">
        <h1 className="font-medium">Legend:</h1>
        {orderStatus.map((status) => (
          <div key={status} className="flex items-center gap-1">
            <div className={orderIndicator(status.toLowerCase())}></div>
            <h3 className="font-light italic">{status}</h3>
          </div>
        ))}
      </div>
      <section className="flex-center gap-5 flex-wrap">
        {orderList.map((order: OrderType) => (
          <div
            key={order._id}
            className="border w-[20rem] rounded-md text-sm overflow-hidden"
          >
            <div className="flex gap-2 p-3 border-b">
              <h1 className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                Order No.: #{order._id}
              </h1>
              <div className="flex-center">
                <div className={orderIndicator(order.status)}></div>
              </div>
            </div>

            {/* All of the items are here including its badge/status at the upper right corner */}
            <Carousel className="flex-center relative">
              <CarouselContent>
                {order.products.map((product) => (
                  <CarouselItem key={product.name}>
                    <div>
                      <section className="flex-center h-[17rem] relative">
                        <div className="absolute top-0 w-full py-2 px-3 flex justify-end">
                          <h3
                            className={`${productStatusBadge(
                              product.productStatus
                            )} text-xs rounded-xl px-1`}
                          >
                            {capitalStatus(product.productStatus)}
                          </h3>
                        </div>

                        <img
                          src={product.imageUrl}
                          alt=""
                          className="w-full h-full object-contain shrink-0"
                        />

                        {/* Lower user details */}
                        <div className="absolute bottom-0 bg-gradient-to-t from-white to-white/5 w-full py-2 px-3 font-medium flex-between">
                          <h1 className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                            {product.name}
                          </h1>
                          <h3>Qty: {product.quantity}</h3>
                        </div>
                      </section>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {order.products.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-2" />
                  <CarouselNext className="absolute right-2" />
                </>
              )}
            </Carousel>

            <div className="border-t p-3 font-medium">
              <div className="flex items-center gap-1">
                <MapPinIcon />
                <h1 className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {order.shippingAddress}
                </h1>
              </div>
              <div className="flex-between">
                <h3>Payment via: {order.paymentMethod}</h3>
                <h3>{formatPrice(String(order.totalFee))}</h3>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  ) : (
    <UserOrderEmptyUI message="You don't have any order yet." />
  );
};

export default UserOrders;
