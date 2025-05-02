import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const booksList = await db.select().from(books);

    return NextResponse.json(booksList, { status: 200 });
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
