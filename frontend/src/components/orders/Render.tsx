import { useGetAllOrders } from "@/lib/react-query/queries";
import { columns } from "./Column";
import { DataTable } from "./DataTable";
import { ScrollArea } from "../ui/scroll-area";

const Render = () => {
  const { data: orders } = useGetAllOrders();

  return (
    <ScrollArea className="flex-grow  px-3">
      <DataTable columns={columns} data={orders || []} />
    </ScrollArea>
  );
};

export default Render;
