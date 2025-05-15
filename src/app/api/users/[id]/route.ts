import { db } from "@/db/drizzle";
import { borrowRecords, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { error: "User id missed!!!" },
        { status: 400 }
      );
    }

    const borrowBooks = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.userId, id));

    if (borrowBooks.length > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete user because there are borrow records associated with it.",
        },
        { status: 400 }
      );
    }

    const deleteUser = await db.delete(users).where(eq(users.id, id));

    if (!deleteUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deleteUser, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting user:", error);
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

interface UpdateTypes {
  status?: "PENDING" | "APPROVED" | "REJECTED";
  role?: "ADMIN" | "USER";
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await req.json();

  const { status, role }: UpdateTypes = body;

  if (!status && !role) {
    return NextResponse.json(
      { error: "No data provided" },
      { status: 400 }
    );
  }

  const updateData: Partial<typeof users.$inferInsert> = {};
  if (status) updateData.status = status;
  if (role) updateData.role = role;

  try {
    const result = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id));

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
              ' "ADMIN | USER" are valid',
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
