"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBooks } from "@/hooks/useBooks";
import { SampleBooks } from "../../../types";
import Image from "next/image";
import BookCover from "../BookCover";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import EditOrDeleteData from "./EditOrDeleteData";

function AllBooksTable() {
  const { data, isLoading, refetch } = useBooks();
  const router = useRouter();

  if (isLoading)
    return (
      <div className="w-full h-[350px] flex place-content-center">
        <Image
          src="/icons/loading-circle.svg"
          alt="loading"
          width={60}
          height={60}
        />
      </div>
    );

  return (
    <section className="mt-7 w-full overflow-hidden">
      <Table className="rounded-sm overflow-hidden">
        <TableCaption>
          A list of your all library books ({data.length})
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-light-300 !border-0">
            <TableHead className="w-[45%]">Book Title</TableHead>
            <TableHead className="w-[20%]">Author</TableHead>
            <TableHead className="min-w-40">Genre</TableHead>
            <TableHead className="min-w-30">Date Created</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as SampleBooks[]).map((book) => (
            <TableRow key={book.id} className="text-dark-200 font-medium">
              <TableCell
                className="font-semibold flex items-center gap-3 cursor-pointer"
                onClick={() => router.push(`/admin/books/${book.id}`)}
              >
                <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                  variant="extraSmall"
                />
                {book.title.length > 50
                  ? `${book.title.substring(0, 50)} ...`
                  : book.title}
              </TableCell>
              <TableCell>
                {book.author.length > 20
                  ? `${book.author.substring(0, 20)} ...`
                  : book.author}
              </TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>
                {dayjs(book.createAt).format("MMM DD YYYY")}
              </TableCell>
              <TableCell>
                <EditOrDeleteData
                  refetch={refetch}
                  id={book.id}
                  dataType="books"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
export default AllBooksTable;
