import BookCover from "./BookCover";
import { SampleBooks, UserParams } from "../../types";
import BookDetails from "./BookDetails";
import { getUser } from "@/lib/actions/getUser";

interface Props {
  latestBook: SampleBooks | undefined;
  userId: string;
}

async function BookReview({ latestBook, userId }: Props) {
  const user = await getUser(userId) as UserParams;

  if (!user) return null;

  if (!latestBook) {
    return <p>No Books in Here!</p>
  }

  const {
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    id,
  } = latestBook;

  return (
    <section className="book-overview">
      <BookDetails
        details={{
          id,
          title,
          author,
          genre,
          rating,
          totalCopies,
          availableCopies,
          description,
        }}
        user={user}
      />
      {/* RIGHT SIDE --- BOOK COVER */}
      <div className="relative flex-1 flex justify-center">
        <div className="relative">
          <BookCover
            className="z-10"
            variant="wide"
            coverColor={`${coverColor}`}
            coverImage={`${coverUrl}`}
          />
        </div>
        <div className="absolute right-12 max-xl:-right-16 top-8 opacity-40 rotate-12 max-sm:hidden">
          <BookCover
            variant="wide"
            coverColor={`${coverColor}`}
            coverImage={`${coverUrl}`}
          />
        </div>
      </div>
    </section>
  );
}

export default BookReview;
