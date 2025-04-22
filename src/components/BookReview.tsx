import BookCover from "./BookCover";
import { SampleBooks } from "../../types";
import { db } from "@/db/drizzle";
import { books, borrowRecords, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import BookDetails from "./BookDetails";

interface Props extends SampleBooks {
  userId: string;
}

async function BookReview({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
  id,
}: Props) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return null;

  const borrow = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
    })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, userId))
    .innerJoin(books, eq(borrowRecords.bookId, books.id));

  const existingRecord = await db
    .select()
    .from(borrowRecords)
    .where(
      and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, id))
    )
    .limit(1);

  const borrowingEligibility = {
    isEligible:
      availableCopies > 0 &&
      user.status === "APPROVED" &&
      borrow.length < 5 &&
      existingRecord.length === 0,
    message:
      availableCopies <= 0
        ? "Book is not available"
        : borrow.length > 5
        ? "You borrow limit reached!!!"
        : existingRecord.length !== 0
        ? "You borrowed this book before."
        : "You are not eligible to borrow this book",
  };

  return (
    <section className="book-overview">
      <BookDetails
        details={{
          id,
          title,
          author,
          genre,
          rating,
          totalCopies,
          availableCopies,
          description,
        }}
        userId={userId}
        borrowingEligibility={borrowingEligibility}
      />
      {/* RIGHT SIDE --- BOOK COVER */}
      <div className="relative flex-1 flex justify-center">
        <div className="relative">
          <BookCover
            classname="z-10"
            variant="wide"
            coverColor={`${coverColor}`}
            coverImage={`${coverUrl}`}
          />
        </div>
        <div className="absolute right-12 max-xl:-right-16 top-8 opacity-40 rotate-12 max-sm:hidden">
          <BookCover
            variant="wide"
            coverColor={`${coverColor}`}
            coverImage={`${coverUrl}`}
          />
        </div>
      </div>
    </section>
  );
}

export default BookReview;
