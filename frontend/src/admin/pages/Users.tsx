import Render from "@/components/users/Render";

const Users = () => {
  return (
    <main className="border flex-center h-full rounded-md">
      <section className="w-full h-full flex flex-col">
        <header className="p-4">
          <h1 className="font-semibold">Users List</h1>
        </header>

        <hr />

        {/* Data Table */}
        <Render />
      </section>
    </main>
  );
};

export default Users;
