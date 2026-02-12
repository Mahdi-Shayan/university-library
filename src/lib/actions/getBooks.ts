"use server";

import { unstable_cache } from "next/cache";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";

export const getBooks = unstable_cache(
  async () => {
    return await db.select().from(books);
  },
  ["books"],
  { revalidate: 600, tags: ["books"] }
);
