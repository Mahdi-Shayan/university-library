import AllBorrowRecordsTable from "@/components/admin/AllBorrowRecordsTable";

function BorrowRecordes() {
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
      </div>

      <AllBorrowRecordsTable />      
    </section>
  );
}
export default BorrowRecordes;
