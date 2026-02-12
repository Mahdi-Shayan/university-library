"use server"

import { unstable_cache } from "next/cache";
import { SampleBooks } from "../../../types";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";


export const getSimilarBooks = unstable_cache(
    async (genre) => {
      return (await db
        .select()
        .from(books)
        .where(eq(books.genre, genre))) as SampleBooks[];
    },
    ["similar-books"],
    {
      revalidate: 600,
      tags: ["similar-books"],
    }
  );