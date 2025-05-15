import { db } from "@/db/drizzle";
import { borrowRecords } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {
  try {
    const bookId = (await params).bookId;

    if (!bookId)
      return new NextResponse(JSON.stringify("User ID required!"), {
        status: 400,
      });

    const book = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, "BORROWED")
        )
      );

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
