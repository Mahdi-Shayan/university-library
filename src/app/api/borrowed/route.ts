import { db } from "@/db/drizzle";
import { books, borrowRecords, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { BorrowBookWithDetails } from "../../../../types";

export async function GET(res: Request) {
  try {
    const { searchParams } = new URL(res.url);
    const withDetails = searchParams.get("withDetails");
    let borrowedBooksList;

    if (!withDetails || withDetails !== "true") {
      borrowedBooksList = await db.select().from(borrowRecords);
    } else {
      borrowedBooksList = (await db
        .select()
        .from(borrowRecords)
        .innerJoin(books, eq(borrowRecords.bookId, books.id))
        .innerJoin(
          users,
          eq(borrowRecords.userId, users.id)
        )) as BorrowBookWithDetails[];
    }

    return NextResponse.json(borrowedBooksList, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify(error.message), {
        status: 500,
      });
    }
    return new NextResponse(JSON.stringify("Unknown error occurred"), {
      status: 500,
    });
  }
}
