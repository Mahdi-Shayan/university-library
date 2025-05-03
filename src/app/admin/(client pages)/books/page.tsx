"use client"

import AllBooksTable from "@/components/admin/AllBooksTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Books() {
  return (
    <>
      <section className="w-full rounded-2xl bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">All Books</h2>
          <Button className="bg-primary-admin hover:bg-primary-admin/90" asChild>
            <Link href="/admin/books/new" className="text-white">
              + Create a New Book
            </Link>
          </Button>
        </div>

        <AllBooksTable />
      </section>
    </>
  );
}

export default Books;
