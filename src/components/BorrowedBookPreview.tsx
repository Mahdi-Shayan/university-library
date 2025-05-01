"use client";

import dayjs from "dayjs";
import { SampleBooks, BorrowedBook } from "../../types";
import BookCover from "./BookCover";
import Image from "next/image";

interface Props {
  books: SampleBooks;
  borrow_records: BorrowedBook;
}

function BorrowedBookPreview({ books, borrow_records }: Props) {
  const borrowDate = dayjs(borrow_records.borrowDate);
  const dueDate = dayjs(borrow_records.dueDate);
  const driff = dueDate.diff(borrowDate, "days");

  return (
    <div className="borrowed-book">
      <div
        className="borrowed-book_cover"
        style={{
          backgroundColor: `color-mix(in oklab, ${books.coverColor} 30%, transparent)`,
        }}
      >
        <div>
          <BookCover
            variant="medium"
            coverColor={books.coverColor}
            coverImage={books.coverUrl}
          />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <h3 className="text-xl font-semibold">
          {books.title}-By {books.author}
        </h3>
        <p className="text-light-100">{books.genre}</p>
      </div>
      <div className="mt-5 text-light-100 space-y-2">
        <p className="flex gap-2">
          <Image
            src="/icons/book-2.svg"
            alt="borrowed icon"
            width={20}
            height={20}
          />
          Borrowed on {borrowDate.format("MMM DD")}
        </p>
        <p className="flex gap-2">
          <Image
            src={
              borrow_records.returnDate
                ? "/icons/tick.svg"
                : "/icons/calendar.svg"
            }
            alt="calendar icon"
            width={20}
            height={20}
          />
          {borrow_records.returnDate
            ? `Returned on ${dayjs(borrow_records.returnDate).format(
                "D[th] MMM"
              )}`
            : `${driff} days left to due`}
        </p>
      </div>
    </div>
  );
}
export default BorrowedBookPreview;
