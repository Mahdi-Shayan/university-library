import Link from "next/link";
import { SampleBooks } from "../../types";
import BookCover from "./BookCover";

function BookCart({
  title,
  genre,
  coverColor,
  coverUrl,
  id,
}: SampleBooks) {
  return (
    <>
      <li>
        <Link href={`/books/${id}`} className='flex flex-col'>
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
          <div className="mt-4">
            <p className="book-title text-lg">{title}</p>
            <p className="book-genre font-light">{genre}</p>
          </div>
        </Link>
      </li>
    </>
  );
}

export default BookCart;
