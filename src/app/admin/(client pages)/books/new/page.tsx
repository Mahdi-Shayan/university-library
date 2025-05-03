import BookForm from "@/components/admin/BookForm";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

function New() {
  return (
    <>
      <section className="w-full max-w-2xl">
        <Button className="back-btn">
          <MoveLeft />
          <Link href="/admin/books">Go back</Link>
        </Button>
        <BookForm />
      </section>
    </>
  );
}

export default New;
