import BookForm from "@/components/admin/BookForm";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import ShowError from "@/components/admin/ShowError";
import { isValidUUID } from "@/lib/helper/checkIsValidId";
import GoBackButton from "@/components/admin/GoBackButton";

async function UpdateBook({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!isValidUUID(id)) {
    return <ShowError title="Error 400" message="Invalid boook ID" />;
  }

  const [book] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!book) {
    return (
      <ShowError
        title="Error 404"
        message="Sorry, there is no book here"
      />
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
