import { SampleBooks } from "../../types";
import BookCart from "./BookCart";

interface Props {
  title: string;
  books: SampleBooks[];
  className?: string;
}

function HomeBookList({ title, books, className }: Props) {
  if (books.length < 2) return;

  return (
    <>
      <section className={className}>
        <h2 className="text-3xl max-md:text-[26px] font-semibold text-light-100">
          {title}
        </h2>
        <ul className="book-list">
          {books.map((book) => (
            <BookCart key={book.title} {...book} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default HomeBookList;
