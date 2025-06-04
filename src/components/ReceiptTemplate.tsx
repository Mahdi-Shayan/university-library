"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { ReceiptParams } from "../../types";

function ReceiptTemplate({ body }: ReceiptParams) {
  const { author, borrowDate, dueDate, genre, title } = body;

  const borrow = dayjs.utc(borrowDate);
  const due = dayjs.utc(dueDate);
  const today = dayjs.utc().startOf("day");
  const driff = due.diff(today, "days");

  function formatDate(date: dayjs.Dayjs) {
    return date.format("DD/MM/YYYY");
  }

  return (
    <div id="receipt" className="receipt-container">
      {/* HEADER */}
      <div className="flex gap-3 text-[26px] font-semibold mb-2">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-white">BookWise</h1>
      </div>
      <div className="space-y-2">
        <h2 className="text-white text-[20px] font-semibold">
          Borrow Receipt
        </h2>
        <p>
          Receipt ID:{" "}
          <span className="text-light-200 font-normal">[#123456]</span>
        </p>
        <p>
          Date Issued:{" "}
          <span className="text-light-200 font-normal">
            [{dayjs().format("DD/MM/YYYY")}]
          </span>
        </p>
      </div>
      <hr />

      {/* BOOK DETAILS */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          Book Details:
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <p className="book-details_item">
            Title: <span className="span">{title}</span>
          </p>
          <p className="book-details_item">
            Author: <span className="span">{author}</span>
          </p>
          <p className="book-details_item">
            Genre: <span className="span">{genre}</span>
          </p>
          <p className="book-details_item">
            Borrowed on: <span className="span">{formatDate(borrow)}</span>
          </p>
          <p className="book-details_item">
            Due Date: <span className="span">{formatDate(due)}</span>
          </p>
          <p className="book-details_item">
            Duration: <span className="span">{driff} Days</span>
          </p>
        </div>
      </div>
      <hr />
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Terms</h2>
        <ul>
          <li className="list-disc list-inside">
            Please return the book by the due date.
          </li>
          <li className="list-disc list-inside">
            Lost or damaged books may incur replacement costs.
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <p>
          Thank you for using{" "}
          <span className="span !text-base">BookWise</span>!
        </p>
        <p>
          Website:{" "}
          <span className="span !text-base">[bookWise.example.com]</span>
        </p>
        <p>
          Email:{" "}
          <span className="span !text-base">
            [support@bookwise.example.com]
          </span>
        </p>
      </div>
    </div>
  );
}
export default ReceiptTemplate;
