import { db } from "@/db/drizzle";
import { books, borrowRecords, dailyStats, users } from "@/db/schema";
import dayjs from "dayjs";
import { eq, gte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const today = dayjs().startOf("day");
  const yesterday = today.subtract(1, "day");

  const todayStr = today.format("YYYY-MM-DD");
  const yesterdayStr = yesterday.format("YYYY-MM-DD");

  try {
    // Collect today's new records
    const [newUsers, newBooks, newBorrowed] = await Promise.all([
      db.select().from(users).where(gte(users.createdAt, today.toDate())),
      db.select().from(books).where(gte(books.createdAt, today.toDate())),
      db
        .select()
        .from(borrowRecords)
        .where(gte(borrowRecords.createAt, today.toDate())),
    ]);

    // Update or insert today's stats
    await db
      .insert(dailyStats)
      .values({
        date: todayStr,
        borrowCount: newBorrowed.length,
        newBooksCount: newBooks.length,
        userSignups: newUsers.length,
      })
      .onConflictDoUpdate({
        target: dailyStats.date,
        set: {
          borrowCount: newBorrowed.length,
          newBooksCount: newBooks.length,
          userSignups: newUsers.length,
        },
      });

    // Fetch today and yesterday stats
    const [todayStats, yesterdayStats] = await Promise.all([
      db.select().from(dailyStats).where(eq(dailyStats.date, todayStr)),
      db
        .select()
        .from(dailyStats)
        .where(eq(dailyStats.date, yesterdayStr)),
    ]);

    return NextResponse.json(
      {
        today: todayStats[0] ?? null,
        yesterday: yesterdayStats[0] ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stats API Error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
