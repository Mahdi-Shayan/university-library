import { db } from "@/db/drizzle";
import { books, borrowRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import BorrowedBookPreview from "./BorrowedBookPreview";
import { BorrowedBook, SampleBooks } from "../../types";

interface Props {
  userId: string;
}

interface IBorrowedBook {
  books: SampleBooks;
  borrow_records: BorrowedBook;
}

async function BorrowBooksList({ userId }: Props) {
  const borrowBooks = (await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, userId))
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .orderBy(
      eq(borrowRecords.status, "LATE RETURNED"),
      eq(borrowRecords.status, "RETURNED"),
      eq(borrowRecords.status, "BORROWED")
    )) as IBorrowedBook[];

  return (
    <div className="h-[90%]">
      <h2 className="text-3xl max-md:text-[26px] font-semibold text-light-100">
        Boorowed books
      </h2>
      {borrowBooks.length > 0 ? (
        <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-5 mt-8 max-w-max mx-auto max-[950px]:!grid-cols-2 max-sm:!grid-cols-1">
          {borrowBooks.map((book) => (
            <BorrowedBookPreview
              books={book.books}
              borrow_records={book.borrow_records}
              key={`${book.borrow_records.id}-${book.borrow_records.createAt}`}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-light-500 text-3xl font-semibold">
            No book borrowed!
          </p>
        </div>
      )}
    </div>
  );
}
export default BorrowBooksList;
