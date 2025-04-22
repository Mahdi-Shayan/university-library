"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { borrowBook } from "@/lib/actions/borrowBook";
import { BorrowBookParams } from "../../types";
import { toast } from "sonner";

interface Props extends BorrowBookParams {
  borrowingEligibility: { isEligible: boolean; message: string };
  setUpdated: (value: boolean) => void;
}

function BorrowBook({
  userId,
  bookId,
  borrowingEligibility,
  setUpdated,
}: Props) {
  const { message, isEligible } = borrowingEligibility;

  const [borrowing, setBorrowing] = useState<boolean>(false);

  async function handleBorrow() {
    let timer;

    if (!isEligible) {
      toast.custom(() => (
        <div className="bg-red-700 text-white p-5 text-[14px] rounded-md w-90">
          <h2>Error</h2>
          <p className="text-light-100 text-[13px] mt-1">{message}</p>
        </div>
      ));
      return;
    }
    try {
      setBorrowing(true);
      setUpdated(false);

      const result = await borrowBook({ userId, bookId });

      if (!result.success) {
        toast.custom(() => (
          <div className="bg-red-700 text-white p-5 text-[14px] rounded-md w-90">
            <h2>Error</h2>
            <p className="text-light-100 text-[13px] mt-1">
              Somthing went wrong. Please try again later!!!
            </p>
          </div>
        ));
        return;
      }
      toast.custom(() => (
        <div className="bg-dark-300 text-white p-5 text-[14px] rounded-md w-90">
          <h2>Success</h2>
          <p className="text-light-100 text-[13px] mt-1">
            Book borrow successfully
          </p>
        </div>
      ));
    } catch (error) {
      toast.custom(() => (
        <div className="bg-red-700 text-white p-5 text-[14px] rounded-md w-90">
          <h2>Error</h2>
          <p className="text-light-100 text-[13px] mt-1">
            An error occurred while borrowing the book
          </p>
        </div>
      ));
    } finally {
      timer = setTimeout(() => {
        setBorrowing(false);
      }, 1000);
      setUpdated(true);
    }
  }

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

export default BorrowBook;
