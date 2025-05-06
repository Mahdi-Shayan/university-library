import { db } from "@/db/drizzle";
import { borrowRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { bookId: string } }
) {
  try {
    const { bookId } = context.params;

    if (!bookId)
      return new NextResponse(JSON.stringify("User ID required!"), {
        status: 400,
      });

    const book = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.bookId, bookId));

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
