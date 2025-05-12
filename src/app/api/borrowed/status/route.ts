import { db } from "@/db/drizzle";
import { borrowRecords } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const bookId = searchParams.get("bookId");

  const body = await req.json();

  const { status }: { status: "BORROWED" | "RETURNED" | "LATE RETURNED" } =
    body;

  if (!status) {
    return NextResponse.json(
      { error: "No data provided" },
      { status: 400 }
    );
  }

  const updateData: Partial<typeof borrowRecords.$inferInsert> = {};
  updateData.status = status;
  if (status === "BORROWED") {
    updateData.returnDate = null;
  } else {
    updateData.returnDate = new Date();
  }

  try {
    if (!bookId || !userId) {
      return NextResponse.json(
        { error: "Book ID and User ID required" },
        { status: 400 }
      );
    }

    const result = await db
      .update(borrowRecords)
      .set(updateData)
      .where(
        and(
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.userId, userId)
        )
      );

    if (!result) {
      return NextResponse.json(
        { error: "Not borrowed record found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting user:", error);
      if (error.name === "NeonDbError") {
        return new NextResponse(
          JSON.stringify({
            error:
              "Validation error: " +
              error.message +
              ' "BORROWED | RETURNED | LATE RETURNED" are valid',
          }),
          { status: 400 }
        );
      }
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return new NextResponse(
      JSON.stringify({ error: "Unknown error occurred" }),
      { status: 500 }
    );
  }
}
