import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDeleteOrder } from "@/lib/react-query/queries";
import { toast } from "react-toastify";

interface IProduct {
  _id: string;
  name: string;
  price: string;
  quantity: number;
  size: string;
  productStatus: string;
  deliveryOption: {
    date: string;
    fee: number;
  };
}

type OrderDataTableType = {
  orderId: string;
  user: string;
  status: string;
  total: string;
  paymentMethod: string;
  shippingAddress: string;
  products?: IProduct[];
};

export const columns: ColumnDef<OrderDataTableType>[] = [
  // {
  //   accessorKey: "orderId",
  //   header: () => <div className="">Order ID</div>,
  //   cell: ({ row }) => {
  //     return <h3 className="">{row.getValue("orderId")}</h3>;
  //   },
  // },
  {
    accessorKey: "user",
    header: () => <div className="">Customer Name</div>,
    cell: ({ row }) => {
      return <h3 className="">{row.getValue("user")}</h3>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="">Payment</div>,
    cell: ({ row }) => {
      return <h3 className="">{row.getValue("paymentMethod")}</h3>;
    },
  },
  {
    accessorKey: "products",
    header: () => <div className="">No. of Products</div>,
    cell: ({ row }) => {
      const product = row.original;

      return <div>{product.products?.length}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      let customStyle;

      switch (row.getValue("status")) {
        case "pending":
          customStyle = "bg-[#FEFFA7] ring-2 ring-[#FFD717]";
          break;

        case "completed":
          customStyle = "bg-[#BFF6C3] ring-2 ring-[#4E9F3D]";
          break;

        case "cancelled":
          customStyle = "bg-[#FF9B9B] ring-2 ring-[#D21312]";
          break;

        default:
          customStyle = "bg-[#EDE8DC] ring-2 ring-[#697565]";
          break;
      }

      const capitalValue = (text: string) => {
        return text[0].toUpperCase() + text.slice(1);
      };

      return (
        <div className="flex">
          <h3
            className={`w-full max-w-[6rem] text-center px-3 py-1 rounded-full ${customStyle}`}
          >
            {capitalValue(row.getValue("status"))}
          </h3>
        </div>
      );
    },
  },
  {
    accessorKey: "shippingAddress",
    header: () => <div className="">Shipping Address</div>,
    cell: ({ row }) => {
      return (
        <h3 className="w-full max-w-[12rem] italic">
          {row.getValue("shippingAddress")}
        </h3>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="">Total</div>,
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(total);

      return <div className="font-medium ">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      const { mutateAsync: deleteOrder, isPending: isDeletingOrder } =
        useDeleteOrder();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Link to={`/admin/product_management?oid=${order.orderId}`}>
              <DropdownMenuItem className="hover:cursor-pointer">
                Go to Product Management
              </DropdownMenuItem>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="text-sm w-full text-start rounded px-2 py-[6px] hover:bg-secondary">
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this order and remove its data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      try {
                        const orderToDelete = await deleteOrder(order.orderId);
                        toast.success(orderToDelete.message);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    disabled={isDeletingOrder}
                    className="space-x-1"
                  >
                    {isDeletingOrder ? (
                      <>
                        <Loader2 className="animate-spin" />
                        <p>Loading...</p>
                      </>
                    ) : (
                      "Proceed"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
