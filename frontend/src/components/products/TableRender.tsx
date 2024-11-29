import { ScrollArea } from "../ui/scroll-area";
import { columns } from "./Column";
import { DataTable } from "./DataTable";
import { useGetAllProducts } from "@/lib/react-query/queries";

const TableRender = () => {
  const { data: products } = useGetAllProducts();

  return (
    <ScrollArea className="flex-grow px-3">
      <DataTable columns={columns} data={products || []} />
    </ScrollArea>
  );
};

export default TableRender;
