import { useGetAllUsers } from "@/lib/react-query/queries";
import { columns } from "./Column";
import { DataTable } from "./DataTable";
import { ScrollArea } from "../ui/scroll-area";

const Render = () => {
  const { data: users } = useGetAllUsers();

  return (
    <ScrollArea className="flex-grow  px-3">
      <DataTable columns={columns} data={users || []} />
    </ScrollArea>
  );
};

export default Render;
