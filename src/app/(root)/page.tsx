import BookReview from "@/components/BookReview";
import HomeBookList from "@/components/HomeBookList";
import { auth } from "../../../auth";
import { notFound } from "next/navigation";
import { getLatestBook } from "@/lib/actions/getLatestBook";

async function Home() {
  const latestBooks = await getLatestBook();

  const session = await auth();

  if(!session || !session.user) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-20">
      <BookReview
        latestBook={latestBooks[0] || undefined}
        userId={session.user.id as string}
      />
      <HomeBookList title="Popular Books" books={latestBooks.slice(1)} />
    </div>
  );
}

export default Home;
