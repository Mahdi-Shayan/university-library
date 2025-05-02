import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id)
      return new NextResponse(JSON.stringify("User ID required!"), {
        status: 400,
      });

    const [book] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

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
