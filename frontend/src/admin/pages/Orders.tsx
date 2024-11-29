import Render from "@/components/orders/Render";

const Orders = () => {
  return (
    <main className="border flex-center h-full rounded-md">
      <section className="w-full h-full flex flex-col">
        <header className="p-4">
          <h1 className="font-semibold">Orders List</h1>
        </header>

        <hr />

        {/* Data Table */}
        <Render />
      </section>
    </main>
  );
};

export default Orders;
