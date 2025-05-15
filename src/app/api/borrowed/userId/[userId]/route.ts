import { db } from "@/db/drizzle";
import { books, borrowRecords } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId;

    if (!userId)
      return new NextResponse(JSON.stringify("User ID required!"), {
        status: 400,
      });

    const book = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.status, "BORROWED")
        )
      )
      .innerJoin(books, eq(borrowRecords.bookId, books.id));

    return new NextResponse(JSON.stringify(book), { status: 200 });
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
