import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { CalendarDays, Dot, Plus } from "lucide-react";
import { SampleBooks } from "../../../types";
import BookCover from "../BookCover";
import dayjs from "dayjs";

interface Props {
  className?: string;
  books: SampleBooks[];
}

function HomeBooksList({ className, books }: Props) {
  return (
    <section
      className={cn(
        "relative space-y-5 bg-white rounded-2xl p-5 h-full overflow-hidden",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">Recently Added Books</h3>
        <Button className="text-primary-admin font-normal !bg-blue-50">
          <Link href="/admin/books">View All</Link>
        </Button>
      </div>
      <div>
        <Link
          href="/admin/books/new"
          className="flex items-center gap-5 bg-light-300 p-4 rounded-lg"
        >
          <div className="flex justify-center items-center size-12 rounded-full bg-white text-dark-400">
            <Plus size={30} />
          </div>
          <h3 className="font-normal text-lg">Add New Book</h3>
        </Link>
      </div>
      <div className="rounded-2xl space-y-3 h-full overflow-y-auto overflow-x-hidden mt-5 pb-5">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex justify-between bg-light-300 p-5"
          >
            <div className="flex gap-5">
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                variant="small"
              />
              <div className="space-y-1">
                <p className="text-[16px] font-medium">{book.title}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <p>
                    By{" "}
                    {book.author.length > 15
                      ? `${book.author.substring(0, 15)} ...`
                      : book.author}
                  </p>
                  <Dot size={25} />
                  <p>{book.genre}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-dark-700">
                  <CalendarDays size={17} />
                  <p>{dayjs(book.createAt).format("DD/MM/YY")}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* LIST EFFECT*/}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-white to-transparent z-20" />
      </div>
    </section>
  );
}
export default HomeBooksList;
