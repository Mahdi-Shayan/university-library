"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { borrowBookAction } from "@/lib/actions/borrowBookAction";
import {
  BorrowedBook,
  SampleBooks,
  UserParams,
} from "../../types";
import { toast } from "sonner";
import { useBorrowedBooks } from "@/hooks/useBorrowedBooks";
import { useBooks } from "@/hooks/useBooks";

interface Props {
  setUpdated: (value: boolean) => void;
  user: UserParams;
  bookId: string;
}

interface BorrowedData {
  books: SampleBooks;
  borrow_records: BorrowedBook;
}

function BorrowBookButton({ user, bookId, setUpdated }: Props) {
  const [borrowing, setBorrowing] = useState(false);
  const { id: userId, status } = user;

  const { data: borrow = [], refetch: borrowedReftch } = useBorrowedBooks(
    "userId",
    userId
  );
  const { data: book, refetch: bookReftch } = useBooks(bookId);

  const existingRecord = useMemo(
    () =>
      (borrow as BorrowedData[]).filter(
        ({ borrow_records }) =>
          borrow_records.bookId === bookId &&
          borrow_records.userId === userId
      ),
    [borrow, bookId, userId]
  );

  const borrowingEligibility = useMemo(() => {
    const isEligible =
      book?.availableCopies > 0 &&
      status === "APPROVED" &&
      borrow.length < 5 &&
      existingRecord.length === 0;

    let message = "You are not eligible to borrow this book";

    if (book?.availableCopies <= 0) {
      message = "Book is not available";
    } else if (borrow.length >= 5) {
      message = "Your borrow limit has been reached";
    } else if (existingRecord.length > 0) {
      message = "You already borrowed this book";
    }

    return { isEligible, message };
  }, [book, status, borrow.length, existingRecord.length]);

  const handleBorrow = async () => {
    const { isEligible, message } = borrowingEligibility;

    if (!isEligible) {
      toast.error(message);
      return;
    }

    try {
      setBorrowing(true);
      setUpdated(false);

      const result = await borrowBookAction({ userId, bookId });

      if (!result.success) {
        toast.error(
          (result.message as string) ||
            "Somthing went wrong. Please try again later!!!"
        );
        return;
      }

      toast.success("Book borrow successfully");
      borrowedReftch();
      bookReftch();
    } catch {
      toast.error("An error occurred while borrowing the book");
    } finally {
      setTimeout(() => setBorrowing(false), 1000);
      setUpdated(true);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" height={20} width={20} />
      <p className="!font-bebas-neue text-xl">
        {borrowing ? "BORROWING THE BOOK..." : "BORROW BOOK REQUEST"}
      </p>
    </Button>
  );
}

export default BorrowBookButton;
