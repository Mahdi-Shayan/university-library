import BookReview from "@/components/BookReview";
import HomeBookList from "@/components/HomeBookList";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { SampleBooks } from "../../../types";
import { auth } from "../../../auth";

export const revalidate = 60 * 10; // 10 min

async function Home() {
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)) as SampleBooks[];

  const session = await auth();

  return (
    <div className="flex flex-col gap-20">
      <BookReview
        {...latestBooks[0]}
        userId={session?.user?.id as string}
      />
      <HomeBookList title="Popular Books" books={latestBooks.slice(1)} />
    </div>
  );
}

export default Home;
