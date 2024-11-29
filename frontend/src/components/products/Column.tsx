import { ProductCollectionType } from "@/types/index.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useDeleteProductById } from "@/lib/react-query/queries";
import { toast } from "react-toastify";

export const columns: ColumnDef<ProductCollectionType>[] = [
  {
    accessorKey: "imageUrl",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="w-[30px] h-[30px]">
          <img
            src={row.getValue("imageUrl")}
            alt="product"
            className="w-full h-full object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <h1 className="font-medium">{row.getValue("name")}</h1>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "subCategory",
    header: "Subcategory",
  },
  {
    accessorKey: "createdAt",
    header: "Date published",
    cell: ({ row }) => {
      const product = row.original;

      return dayjs(product.createdAt).format("D/M/YYYY");
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      const {
        mutateAsync: deleteProduct,
        isPending: isDeletingProductLoading,
      } = useDeleteProductById();

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
            <Link to={`/admin/product_view/?pid=${product._id}`}>
              <DropdownMenuItem className="hover:cursor-pointer">
                More Details
              </DropdownMenuItem>
            </Link>
            <Link to={`/admin/product_edit/?pid=${product._id}`}>
              <DropdownMenuItem className="hover:cursor-pointer">
                Edit
              </DropdownMenuItem>
            </Link>

            {/* Alert Dialog for Deleting Product IF KAYA */}
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
                    your product and remove its data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      try {
                        const deletedProduct = await deleteProduct(product._id);
                        toast.success(deletedProduct.message);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    disabled={isDeletingProductLoading}
                    className="space-x-1"
                  >
                    {isDeletingProductLoading ? (
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
            {/*  */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
