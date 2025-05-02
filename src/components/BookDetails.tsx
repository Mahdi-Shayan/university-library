"use client";

import { useEffect, useState } from "react";
import { SampleBooks, UserParams } from "../../types";
import Image from "next/image";
import BorrowBookButton from "./BorrowBookButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Details = Omit<
  SampleBooks,
  "coverUrl" | "coverColor" | "videoUrl" | "summary"
>;

function BookDetails({
  details,
  user,
}: {
  details: Details;
  user: UserParams;
}) {
  const [book, setBook] = useState<SampleBooks>();
  const { author, genre, title, id, rating, description } = details;
  const [updated, setUpdated] = useState(false);

  const queryCalient = new QueryClient();

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/books/${id}`, { cache: "no-store" });
      const data = await res.json();

      setBook(data);
    };

    fetchBook();
  }, [id, updated]);

  return (
    <div className="flex flex-col flex-1 gap-5">
      <h1 className="text-6xl leading-18 font-bold max-lg:text-5xl max-sm:text-4xl">
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
          <Image src="/icons/star.svg" alt="rate" height={22} width={22} />
          <p className="font-semibold">
            <span className="text-primary">{rating}</span>
            /5
          </p>
        </div>
      </div>
      <div className="book-copies">
        <p>
          Total books:
          <span>{book ? book.totalCopies : "..."}</span>
        </p>
        <p>
          Available books:
          <span>{book ? book.availableCopies : "..."}</span>
        </p>
      </div>
      <p className="book-description">{description}</p>
      <QueryClientProvider client={queryCalient}>
        <BorrowBookButton
          bookId={id}
          user={user}
          setUpdated={setUpdated}
        />
      </QueryClientProvider>
    </div>
  );
}
export default BookDetails;
