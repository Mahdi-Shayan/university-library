import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { CalendarDays, Edit3, MoveLeft } from "lucide-react";
import Link from "next/link";
import { isValidUUID } from "@/lib/helper/checkIsValidId";
import ShowError from "@/components/admin/ShowError";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import IKVideoReview from "@/components/admin/IKVideoReview";

async function BookDetails({ params }: { params: { id: string } }) {
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
    <section>
      <Button className="back-btn">
        <MoveLeft />
        <Link href="/admin/books">Go back</Link>
      </Button>
      <div className="flex flex-col gap-15">
        {/* HEADER */}
        <div className="flex gap-15 max-lg:flex-col max-lg:gap-10">
          <div
            className="borrowed-book_cover w-[280px]"
            style={{
              backgroundColor: `color-mix(in oklab, ${book.coverColor} 30%, black 10%`,
            }}
          >
            <div>
              <BookCover
                variant="medium"
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
              />
            </div>
          </div>
          <div className="space-y-4 min-w-[35%]">
            <p className="flex items-center gap-4 text-light-500 font-normal text-lg">
              Created at:
              <span className="flex items-center gap-2 text-dark-200">
                <CalendarDays size={20} />
                {dayjs(book.createdAt).format("DD/MM/YYYY")}
              </span>
            </p>
            <h2 className="text-2xl text-dark-400 font-semibold">
              {book.title}
            </h2>
            <h4 className="text-xl text-dark-200 font-semibold">
              By {book.author}
            </h4>
            <p className="font-normal text-lg text-light-500">
              {book.genre}
            </p>
            <Link
              prefetch={true}
              href={`/admin/books/update/${id}`}
              className="flex gap-2 items-center"
            >
              <Button className="bg-primary-admin hover:bg-primary-admin/90 p-6 text-white text-base w-full">
                <Edit3 className="!w-[18px] !h-[18px]" /> Edit Book
              </Button>
            </Link>
          </div>
        </div>

        {/* SUMMARY AND TRAILER */}
        <div className="flex gap-10 max-lg:flex-col">
          <div className="flex-1 space-y-5">
            <h3 className="text-xl font-semibold">Summary</h3>
            {book.summary.split("\n").map((line, ind) => (
              <p key={ind}>{line}</p>
            ))}
          </div>
          <div className="flex-1 space-y-5">
            <h3 className="text-xl font-semibold">Video</h3>
            <IKVideoReview filePath={book.videoUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default BookDetails;
