import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const borrowedBooksList = await db.select().from(users);

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