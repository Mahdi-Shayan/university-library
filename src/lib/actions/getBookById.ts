"use server";

import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getBookById = async (id: string) =>
  unstable_cache(
    async () => {
      return await db
        .select()
        .from(books)
        .where(eq(books.id, id))
        .limit(1);
    },
    ["book", id],
    { revalidate: 600, tags: [`book-${id}`] }
  )();
