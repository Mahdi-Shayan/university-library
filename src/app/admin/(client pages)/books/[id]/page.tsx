"use client";

import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { CalendarDays, Edit3 } from "lucide-react";
import Link from "next/link";
import { isValidUUID } from "@/lib/helper/checkIsValidId";
import ShowError from "@/components/admin/ShowError";
import dayjs from "dayjs";
import IKVideoReview from "@/components/admin/IKVideoReview";
import GoBackButton from "@/components/admin/GoBackButton";
import { useParams } from "next/navigation";
import { useBooks } from "@/hooks/useBooks";
import Image from "next/image";

function BookDetails() {
  const { id } = useParams() as { id: string };

  if (!isValidUUID(id)) {
    return <ShowError title="Error 400" message="Invalid book ID" />;
  }

  const { data: book, isLoading } = useBooks(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)]">
        <Image
          src="/icons/loading-circle.svg"
          alt="Loading..."
          width={80}
          height={80}
        />
      </div>
    );
  }

  if (!book) {
    return (
      <ShowError
        title="Error 404"
        message="Sorry, there is no book here"
      />
    );
  }

  return (
    <section>
      <GoBackButton />
      <div className="flex flex-col gap-15">
        {/* HEADER */}
        <div className="flex gap-15 max-lg:flex-col max-lg:gap-10">
          <div
            className="borrowed-book_cover w-[280px]"
            style={{
              backgroundColor: `color-mix(in oklab, ${book.coverColor} 30%, black 10%`,
            }}
          >
            <div>
              <BookCover
                variant="medium"
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
              />
            </div>
          </div>
          <div className="space-y-4 min-w-[35%]">
            <p className="flex items-center gap-4 text-light-500 font-normal text-lg">
              Created at:
              <span className="flex items-center gap-2 text-dark-200">
                <CalendarDays size={20} />
                {dayjs(book.createdAt).format("DD/MM/YYYY")}
              </span>
            </p>
            <h2 className="text-2xl text-dark-400 font-semibold">
              {book.title}
            </h2>
            <h4 className="text-xl text-dark-200 font-semibold">
              By {book.author}
            </h4>
            <p className="font-normal text-lg text-light-500">
              {book.genre}
            </p>
            <Link
              prefetch={true}
              href={`/admin/books/update/${id}`}
              className="flex gap-2 items-center"
            >
              <Button className="bg-primary-admin hover:bg-primary-admin/90 p-6 text-white text-base w-full">
                <Edit3 className="!w-[18px] !h-[18px]" /> Edit Book
              </Button>
            </Link>
          </div>
        </div>

        {/* SUMMARY AND TRAILER */}
        <div className="flex gap-10 max-lg:flex-col">
          <div className="flex-1 space-y-5">
            <h3 className="text-xl font-semibold">Summary</h3>
            {(book.summary as string).split("\n").map((line, ind) => (
              <p key={ind}>{line}</p>
            ))}
          </div>
          <div className="flex-1 space-y-5">
            <h3 className="text-xl font-semibold">Video</h3>
            <IKVideoReview filePath={book.videoUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default BookDetails;
