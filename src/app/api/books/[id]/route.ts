import { db } from "@/db/drizzle";
import { books, borrowRecords } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { SampleBooks } from "../../../../../types";
import { revalidatePath } from "next/cache";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id)
      return new NextResponse(JSON.stringify("Book id missed!!!"), {
        status: 400,
      });

    const [book] = await db
      .select()
      .from(books)
      .where(eq(books.id, id))
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
        { error: "Book id missed!!!" },
        { status: 400 }
      );
    }

    const borrowBooks = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.bookId, id));

    if (borrowBooks.length > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete book because there are borrow records associated with it.",
        },
        { status: 400 }
      );
    }

    const deleteBook = await db.delete(books).where(eq(books.id, id));

    if (!deleteBook) {
      return NextResponse.json(
        { error: "Book not found!" },
        { status: 404 }
      );
    }

    revalidatePath("/", "page");
    revalidatePath("/library", "page");
    
    return NextResponse.json(deleteBook, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting book:", error);
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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = (await req.json()) as SampleBooks;

    if (!id) {
      return NextResponse.json(
        { error: "Book id missed!!!" },
        { status: 400 }
      );
    }

    const updateBook = await db
      .update(books)
      .set({ ...body, id })
      .where(eq(books.id, id));

    if (!updateBook) {
      return NextResponse.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    revalidatePath("/");
    revalidatePath("/library");
    return NextResponse.json(updateBook, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating book:", error);
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
