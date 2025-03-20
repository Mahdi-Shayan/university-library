import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SampleBooks } from "../../../../../types";
import BookReview from "@/components/BookReview";
import { redirect } from "next/navigation";
import BookVideo from "@/components/BookVideo";
import Link from "next/link";
import BookCover from "@/components/BookCover";

async function BookDetails({ params }: { params: any }) {
  const [book] = (await db
    .select()
    .from(books)
    .where(eq(params.id, books.id))
    .limit(1)) as SampleBooks[];

  if (!book) redirect("/404");

  const { videoUrl, summary, genre } = book;

  const similarBooks = (await db
    .select()
    .from(books)
    .where(eq(books.genre, genre))) as SampleBooks[];

  return (
    <>
      <div>
        <BookReview {...book} />
        <div className="book-details">
          {/* BOOK SUMMARY */}
          <div className="flex-[1.2]">
            <section className="flex flex-col gap-7">
              <h3 className="font-semibold text-3xl">Video</h3>
              <BookVideo videoUrl={videoUrl} />
            </section>
            <section className="mt-10 flex flex-col gap-7">
              <h3 className="font-semibold text-3xl">Summary</h3>
              <div className="space-y-5 book-description mt-0">
                {summary.split("\n").map((line, ind) => (
                  <p key={ind}>{line}</p>
                ))}
              </div>
            </section>
          </div>

          {/* SIMILAR BOOKS */}
          <div className="flex flex-1 flex-col gap-7">
            <h3 className="font-semibold text-3xl">More similar books</h3>
            {similarBooks.length > 1 ? (
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2  gap-3 gap-y-5">
                {similarBooks.map((book) => (
                  <Link href={`/books/${book.id}`}>
                    <BookCover
                      variant="medium"
                      coverColor={book.coverColor}
                      coverImage={book.coverUrl}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-light-500 text-2xl font-semibold">
                There is no similar book 😴!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
