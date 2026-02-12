"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getUser = async (id: string) => unstable_cache(
  async () => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return user ?? null;
  },
  ["user_by_id", id],
  {
    revalidate: 60,
    tags: ["user", `user:${id}`],
  }
)();