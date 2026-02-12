"use server"

import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { SampleBooks } from "../../../types";
import { unstable_cache } from "next/cache";


export const getLatestBook = unstable_cache(
  async () => {
    return (await db.select().from(books).limit(10)) as SampleBooks[] | [];
  },
  ["books"],
  { revalidate: 600, tags: ["books"] }
);