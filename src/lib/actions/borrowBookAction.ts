"use server";

import { db } from "@/db/drizzle";
import { books, borrowRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import { BorrowBookParams } from "../../../types";

export async function borrowBookAction(params: BorrowBookParams) {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({
        availableCopies: books.availableCopies,
      })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        message: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(15, "day").toDate();
    const record = await db
      .insert(borrowRecords)
      .values({
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      })
      .returning();

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

type StatusType = "BORROWED" | "RETURNED" | "LATE RETURNED";

export async function updateBorrowedStatus(
  bookId: string,
  status: StatusType
) {
  try {
    const record = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.bookId, bookId))
      .limit(1);

    if (!record.length) {
      return {
        success: false,
        message: "Borrow record not found",
      };
    }

    if (status === "RETURNED") {
      await db
        .update(borrowRecords)
        .set({ status, returnDate: new Date() })
        .where(eq(borrowRecords.id, record[0].id));
    } else {
      await db
        .update(borrowRecords)
        .set({ status })
        .where(eq(borrowRecords.id, record[0].id));
    }

    return {
      success: true,
      message: "Book returned successfully",
    };
  } catch (error) {
    console.error(error);
  }
}
