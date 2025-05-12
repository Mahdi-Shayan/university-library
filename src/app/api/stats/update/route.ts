import { db } from "@/db/drizzle";
import { dailyStats, users, books, borrowRecords } from "@/db/schema";
import { eq, gte, sql } from "drizzle-orm";

export async function POST() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const existing = await db
    .select()
    .from(dailyStats)
    .where(eq(dailyStats.date, todayStr));

  if (existing.length > 0) {
    return Response.json({ message: "Stats already recorded for today" });
  }

  const [borrowCount] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(borrowRecords)
    .where(gte(borrowRecords.createAt, today));

  const [newBooksCount] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(books)
    .where(gte(books.createdAt, today));

  const [userSignups] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(users)
    .where(gte(users.createdAt, today));

  await db.insert(dailyStats).values({
    date: todayStr,
    borrowCount: borrowCount.count,
    newBooksCount: newBooksCount.count,
    userSignups: userSignups.count,
  });

  return Response.json({ message: "Stats updated" });
}
