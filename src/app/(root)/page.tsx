import BookReview from "@/components/BookReview";
import HomeBookList from "@/components/HomeBookList";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { SampleBooks } from "../../../types";
import { auth } from "../../../auth";
import { unstable_cache } from "next/cache";

export const revalidate = 600;

async function Home() {
  const getLatestBook = unstable_cache(
    async () => {
      return (await db.select().from(books).limit(10)) as SampleBooks[];
    },
    ["books"],
    { revalidate: 600, tags: ["books"] }
  );

  const latestBooks = await getLatestBook();

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
