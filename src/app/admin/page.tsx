import HomeRequestsList from "@/components/admin/HomeRequestsList";
import { db } from "@/db/drizzle";
import { books, borrowRecords, users } from "@/db/schema";
import { BorrowedBook, SampleBooks, UserParams } from "../../../types";
import HomeBooksList from "@/components/admin/HomeBooksList";

async function Admin() {
  const booksList = (await db.select().from(books)) as SampleBooks[];
  const borrowedBooks = (await db
    .select()
    .from(borrowRecords)) as BorrowedBook[];
  const usersList = (await db.select().from(users)) as UserParams[];

  return (
    <section>
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
