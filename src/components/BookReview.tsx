import BookCover from "./BookCover";
import { SampleBooks, UserParams } from "../../types";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import BookDetails from "./BookDetails";

interface Props extends SampleBooks {
  userId: string;
}

async function BookReview({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
  id,
}: Props) {
  const [user] = (await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)) as UserParams[];

  if (!user) return null;

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
