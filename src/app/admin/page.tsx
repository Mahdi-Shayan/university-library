import HomeRequestsList from "@/components/admin/HomeRequestsList";
import { db } from "@/db/drizzle";
import { books, borrowRecords, users } from "@/db/schema";
import { BorrowedBook, SampleBooks, UserParams } from "../../../types";
import HomeBooksList from "@/components/admin/HomeBooksList";
import config from "@/lib/config";
import StatsIcons from "@/components/admin/StatsIcons";
import { cn } from "@/lib/utils";

function calcCount(
  todayStats: number,
  yesterdayStats: number,
  className?: string
) {
  const calc = todayStats - (yesterdayStats || 0);

  return (
    <div
      className={cn(
        className,
        "font-normal",
        calc >= 0 ? "text-green-500" : "text-orange-500"
      )}
    >
      {calc >= 0 ? (
        <StatsIcons type="increase" />
      ) : (
        <StatsIcons type="decrease" />
      )}
      <p>{calc}</p>
    </div>
  );
}

async function Admin() {
  const booksList = (await db.select().from(books)) as SampleBooks[];
  const borrowedBooks = (await db
    .select()
    .from(borrowRecords)) as BorrowedBook[];
  const usersList = (await db.select().from(users)) as UserParams[];

  const res = await fetch(`${config.env.apiEndpoint}/api/stats`, {
    cache: "no-store",
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.error);
  }

  const { borrowCount, newBooksCount, userSignups } = result.today;
  const yesterday = result.yesterday;

  const statusStyles = {
    container:
      "flex flex-col justify-between bg-white p-5 rounded-lg h-29",
    titleContainer: "flex items-center gap-3 max-md:justify-between",
    titleTxt: "text-[16px] font-normal text-gray-500",
    value: "text-[28px] font-semibold max-md:text-2xl",
    stats: "flex items-center gap-1",
  };

  const { container, titleContainer, titleTxt, value, stats } =
    statusStyles;

  return (
    <section>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mb-5">
        <div className={container}>
          <div className={titleContainer}>
            <h4 className={titleTxt}>Borrowed Books</h4>
            {calcCount(borrowCount, yesterday?.borrowCount, stats)}
          </div>
          <p className={value}>{borrowCount}</p>
        </div>
        <div className={container}>
          <div className={titleContainer}>
            <h4 className={titleTxt}>Total User</h4>
            {calcCount(userSignups, yesterday?.userSignups, stats)}
          </div>
          <p className={value}>{userSignups}</p>
        </div>
        <div className={container}>
          <div className={titleContainer}>
            <h4 className={titleTxt}>Total Book</h4>
            {calcCount(newBooksCount, yesterday?.newBooksCount, stats)}
          </div>
          <p className={value}>{newBooksCount}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-[repeat(2,minmax(0,450px))] max-lg:grid-cols-1 gap-5">
        {/* BORROWED AND USERS REQUESTS LIST */}
        <HomeRequestsList
          type="books"
          users={usersList}
          borrowedBooks={borrowedBooks}
          books={booksList}
        />
        <HomeRequestsList
          type="users"
          users={usersList}
          borrowedBooks={borrowedBooks}
          books={booksList}
          className="row-start-2"
        />
        <HomeBooksList className="row-span-2" books={booksList} />
      </div>
    </section>
  );
}

export default Admin;
