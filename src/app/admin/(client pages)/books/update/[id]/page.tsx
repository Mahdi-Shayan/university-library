"use client";

import BookForm from "@/components/admin/BookForm";
import ShowError from "@/components/admin/ShowError";
import { isValidUUID } from "@/lib/helper/checkIsValidId";
import GoBackButton from "@/components/admin/GoBackButton";
import { useBooks } from "@/hooks/useBooks";
import Image from "next/image";
import { useParams } from "next/navigation";

async function UpdateBook() {
  const { id } = useParams() as { id: string };

  if (!isValidUUID(id)) {
    return <ShowError title="Error 400" message="Invalid boook ID" />;
  }

  const { data: book, isLoading } = useBooks(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)]">
        <Image
          src="/icons/loading-circle.svg"
          alt="Loading..."
          width={80}
          height={80}
        />
      </div>
    );
  }

  return (
    <section className="w-full max-w-2xl">
      <GoBackButton />
      <BookForm type="update" book={book} />
    </section>
  );
}
export default UpdateBook;
