import AllUsersTable from "@/components/admin/AllUsersTabale";

function Users() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>

      <AllUsersTable />
    </section>
  );
}
export default Users;
