import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userRequest = await db
      .select()
      .from(users)
      .where(eq(users.status, "PENDING"));

    if (!userRequest) {
      return NextResponse.json(
        { error: "There is no any request" },
        { status: 404 }
      );
    }

    return NextResponse.json(userRequest, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
