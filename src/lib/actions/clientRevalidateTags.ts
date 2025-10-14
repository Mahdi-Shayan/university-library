"use server";
import { revalidateTag } from "next/cache";

export async function clientRevalidateTag(bookId: string) {
  revalidateTag(`book-${bookId}`);
  return { success: true };
}
