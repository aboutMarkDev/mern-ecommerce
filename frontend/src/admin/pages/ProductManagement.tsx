import AdminHeader from "@/components/AdminHeader";
import { Button } from "@/components/ui/button";
import {
  useCheckAndUpdateOrder,
  useGetOrderById,
  useUpdateProductStatus,
} from "@/lib/react-query/queries";
import { formatPrice } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { orderProductStatus } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

type OrderProductType = {
  _id: string;
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
  size: string;
  deliveryOption: {
    date: string;
    fee: number;
  };
  productStatus: "toPay" | "toReceive" | "delivered" | "cancelled";
};

const ProductManagement = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("oid");

  const navigate = useNavigate();

  const { data: order, isPending: isOrderLoading } = useGetOrderById(
    orderId || ""
  );

  const {
    mutateAsync: changeProductStatus,
    isPending: isChangingStatusLoading,
  } = useUpdateProductStatus(orderId || "", order?.userId || "");

  const {
    mutateAsync: checkAndUpdateOrderStatus,
    isPending: isCheckingLoading,
  } = useCheckAndUpdateOrder(orderId || "", order?.userId || "");

  const [updatedStatus, setUpdatedStatus] = useState<string[]>([]);

  const handleStatusChange = (value: string, index: number) => {
    setUpdatedStatus((prevData) => {
      const newData = [...prevData];
      newData[index] = value;
      return newData;
    });
  };

  const handleSubmit = async () => {
    if (updatedStatus.length > 0) {
      try {
        const update = await changeProductStatus(updatedStatus);
        // When we changed the product status check the status and update also the order status

        await checkAndUpdateOrderStatus();

        toast.success(update.message);
        navigate("/admin/orders");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("You didn't modify the status! 😒");
    }
  };

  if (isCheckingLoading) {
    return (
      <div className="flex-center h-full gap-1 border rounded-md">
        <Loader2 className="animate-spin" width={30} height={30} />
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return isOrderLoading ? (
    <div className="flex-center h-full gap-1 border rounded-md">
      <Loader2 className="animate-spin" width={30} height={30} />
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  ) : (
    <main className="border h-full rounded-md flex flex-col gap-3 pb-3">
      <AdminHeader title="Manage Product Order" />

      <ScrollArea className="px-5">
        <section className="border w-full mx-auto rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center"></TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Size</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order?.products?.map((item: OrderProductType, index: number) => {
                return (
                  <TableRow key={item.name}>
                    <TableCell>
                      <div className="border rounded-md w-[14rem] h-[14rem] max-md:w-[10rem] max-md:h-[10rem] overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{item.name}</TableCell>
                    <TableCell className="text-center">
                      {formatPrice(item.price)}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.size ? item.size : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-center w-[12rem]">
                      {/* {pStatus?.at(index)} */}
                      <Select
                        value={updatedStatus[index] || item.productStatus}
                        onValueChange={(value) =>
                          handleStatusChange(value, index)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product status" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderProductStatus.map((item) => (
                            <SelectItem value={item.value} key={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>

        <div className="flex items-center justify-end gap-2 mt-3">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isChangingStatusLoading}
            onClick={handleSubmit}
            className="space-x-1"
          >
            {isChangingStatusLoading ? (
              <>
                <Loader2 />
                <p>Loading...</p>
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </ScrollArea>
    </main>
  );
};

export default ProductManagement;
