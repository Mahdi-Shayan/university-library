"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { SampleBooks, BorrowedBook } from "../../types";
import BookCover from "./BookCover";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Calendar, CircleCheckBig, OctagonAlert } from "lucide-react";
import { useEffect } from "react";
import { updateBorrowedStatus } from "@/lib/actions/borrowBookAction";
import ReceiptTemplate from "./ReceiptTemplate";
import { toPng } from "html-to-image";

dayjs.extend(utc);

interface Props {
  books: SampleBooks;
  borrow_records: BorrowedBook;
}

function BorrowedBookPreview({ books, borrow_records }: Props) {
  const { author, title, genre } = books;
  const borrowDate = dayjs.utc(borrow_records.borrowDate);
  const dueDate = dayjs.utc(borrow_records.dueDate);
  const today = dayjs.utc().startOf("day");
  const driff = dueDate.diff(today, "days");

  const statusColorStyle = borrow_records.returnDate
    ? "text-green-500"
    : driff <= 0
      ? "text-red"
      : driff <= 5
        ? "text-yellow-300"
        : "";

  useEffect(() => {
    async function handleStatusChange() {
      if (borrow_records.returnDate) {
        await updateBorrowedStatus(books.id, "RETURNED");
      } else if (driff <= 0) {
        await updateBorrowedStatus(books.id, "LATE RETURNED");
      }
    }

    handleStatusChange();
  }, [driff, borrow_records.returnDate, books.id]);

  const bgCover = {
    backgroundColor: `color-mix(in oklab, ${books.coverColor} 30%, transparent)`,
  };

  const handleDownload = async () => {
    const receipt = document.querySelector("#receipt") as HTMLDivElement;
    if (!receipt) return;

    const dataUrl = await toPng(receipt);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${books.title.replace(" ", "-")}-receipt.png`;
    link.click();
  };

  return (
    <div className="borrowed-book flex flex-col overflow-hidden">
      {/* RECEIPT */}
      <div className="absolute select-none left-[9999] top-[9999] opacity-0">
        <ReceiptTemplate
          body={{
            author,
            title,
            genre,
            borrowDate: borrow_records.borrowDate,
            dueDate: borrow_records.dueDate,
          }}
        />
      </div>

      {driff <= 5 && !borrow_records.returnDate && (
        <OctagonAlert
          size={30}
          className={cn("absolute top-0 left-0", statusColorStyle)}
        />
      )}
      <div className="borrowed-book_cover" style={bgCover}>
        <div>
          <BookCover
            variant="medium"
            coverColor={books.coverColor}
            coverImage={books.coverUrl}
          />
        </div>
      </div>
      {/* BOOK INFO */}
      <div className="flex flex-col justify-between h-full gap-5 mt-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            {books.title}-By {books.author}
          </h3>
          <p className="text-light-100">{books.genre}</p>
        </div>
        <div className="text-light-100 space-y-2">
          <p className="flex gap-2">
            <Image
              src="/icons/book-2.svg"
              alt="borrowed icon"
              width={20}
              height={20}
            />
            Borrowed on {borrowDate.format("MMM DD")}
          </p>

          {/* DUE DATE AND RECEIPT */}
          <div className="flex justify-between items-center">
            <p className={cn("flex gap-2 items-center", statusColorStyle)}>
              {borrow_records.returnDate ? (
                <CircleCheckBig size={20} />
              ) : driff > 0 ? (
                <Calendar
                  size={20}
                  className={cn(driff > 5 && "text-yellow-200")}
                />
              ) : (
                <OctagonAlert size={20} className="text-red" />
              )}
              {borrow_records.returnDate
                ? `Returned on ${dayjs(borrow_records.returnDate).format(
                    "D[th] MMM"
                  )}`
                : driff <= 0
                  ? "Overdue Return"
                  : `${driff} days left to due`}
            </p>
            <a
              style={bgCover}
              className="p-[6px] rounded-sm cursor-pointer"
              onClick={handleDownload}
            >
              <Image
                src="/icons/receipt.svg"
                alt="receipt icon"
                width={20}
                height={20}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BorrowedBookPreview;
