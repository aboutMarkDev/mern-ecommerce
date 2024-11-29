import TableRender from "@/components/products/TableRender";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <main className="border flex-center rounded-md h-full">
      {/* Inner Container */}
      <section className=" w-full h-full flex flex-col">
        {/* Header */}
        <header className="px-4 py-[10px] flex-between">
          <h1 className="font-semibold">Products List</h1>
          <Link to="/admin/add_product">
            <Button className="flex items-center gap-1">
              <PlusCircle />
              Add Product
            </Button>
          </Link>
        </header>

        <hr />

        {/* Data Table */}
        <TableRender />
      </section>
    </main>
  );
};

export default Products;
