import BookReview from "@/components/BookReview";
import HomeBookList from "@/components/HomeBookList";
import { sampleBooks } from "@/constants";


export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <BookReview {...sampleBooks[0]}/>
      <HomeBookList title="Popular Books" books={sampleBooks}/>
    </div>
  );
}
