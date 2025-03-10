import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";
import { SampleBooks } from "../../types";

interface Props extends SampleBooks {
  // userId: string;
}

function  BookReview({
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
  // userId,
}: Props) {
  return (
    <section className="book-overview">
      <div className="flex flex-col flex-1 gap-5">
        <h1 className="text-6xl font-bold max-lg:text-5xl max-sm:text-4xl">
          {title}
        </h1>
        <div className="book-info font-light">
          <p>
            By <span className="text-primary font-semibold">{author}</span>
          </p>
          <p>
            Category:{" "}
            <span className="text-primary font-semibold">{genre}</span>
          </p>
          <div className="flex gap-2">
            <Image
              src="/icons/star.svg"
              alt="rate"
              height={22}
              width={22}
            />
            <p className="font-semibold">
              <span className="text-primary">{rating}</span>
              /5
            </p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total books:
            <span>{totalCopies}</span>
          </p>
          <p>
            Available books:
            <span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <Button className="book-overview_btn">
          <Image src="/icons/book.svg" alt="book" height={20} width={20} />
          <p className="!font-bebas-neue text-xl">BORROW BOOK REQUEST</p>
        </Button>
      </div>

      {/* RIGHT SIDE --- BOOK COVER */}
      <div className="relative flex-1 flex justify-center">
        <div className="relative">
          <BookCover
            classname="z-10"
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
