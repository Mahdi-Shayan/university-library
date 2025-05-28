"use server";

import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { SampleBooks } from "../../../../../types";
import { revalidatePath } from "next/cache";

export async function createBook(
  params: Omit<SampleBooks, "id" | "availableCopies">
) {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    revalidatePath("/");
    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
}
