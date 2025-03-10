import BookReview from "@/components/BookReview";
import HomeBookList from "@/components/HomeBookList";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { SampleBooks } from "../../../types";

async function Home() {
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)) as SampleBooks[];

  return (
    <div className="flex flex-col gap-20">
      <BookReview {...latestBooks[0]} />
      <HomeBookList title="Popular Books" books={latestBooks.slice(1)} />
    </div>
  );
}

export default Home;
