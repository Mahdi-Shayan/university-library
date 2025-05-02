import { db } from "@/db/drizzle";
import { books, borrowRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { userId: string } }
) {
  try {
    const { userId } = context.params;

    if (!userId)
      return new NextResponse(JSON.stringify("User ID required!"), {
        status: 400,
      });

    const book = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.userId, userId))
      .innerJoin(books, eq(borrowRecords.bookId, books.id))

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
