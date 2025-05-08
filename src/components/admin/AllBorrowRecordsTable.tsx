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
import { useBorrowedBooks } from "@/hooks/useBorrowedBooks";
import { BorrowBookWithDetails } from "../../../types";
import Image from "next/image";
import BookCover from "../BookCover";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/utils";
import dayjs from "dayjs";
import BorrowedStatusSelector from "./BorrowedStatusSelector";
import SendReceiptEmail from "./SendReceiptEmail";
import ShowError from "./ShowError";

function AllBorrowRecordsTable() {
  const { data, isLoading, refetch, isError } =
    useBorrowedBooks("allWidthDetails");
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="w-full h-115 flex place-content-center">
        <Image
          src="/icons/loading-circle.svg"
          alt="loading"
          width={60}
          height={60}
        />
      </div>
    );
  }

  if (!data.length) {
    return (
      <section className="flex flex-col items-center justify-center gap-2 h-115 w-full">
        <Image
          src="/images/no-borrowed.png"
          alt="no borrowed book"
          height={350}
          width={350}
          className="mb-5"
        />
        <h2 className="font-semibold text-2xl">No Boorowed Book Here!</h2>
        <p className="text-light-500">
          There are no borrow book requests awaiting your review at this
          time.
        </p>
      </section>
    );
  }
  if (isError) {
    return (
      <ShowError
        message="Something went wrong, please try again later!"
        title="Error 500"
      />
    );
  }

  function getDate(date: Date | string) {
    return dayjs(date).format("MMM DD YYYY");
  }

  return (
    <section className="relative mt-7 w-full">
      <Table>
        <TableCaption>
          A list of your all borrow records ({data.length})
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-light-300 !border-0">
            <TableHead className="min-w-40">Book</TableHead>
            <TableHead className="min-w-40">User Requested</TableHead>
            <TableHead className="min-w-30">Status</TableHead>
            <TableHead className="min-w-30">Borrowed Date</TableHead>
            <TableHead className="min-w-30">Return Date</TableHead>
            <TableHead className="min-w-30">Due Date</TableHead>
            <TableHead>Receipt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as BorrowBookWithDetails[]).map((borrowed, ind, arr) => {
            const { books, borrow_records, users } = borrowed;

            if (!books || !borrow_records || !users) {
              return (
                <tr key={ind}>
                  <td className="py-2">
                    <Image
                      src="/icons/loading-circle.svg"
                      alt="loading"
                      height={35}
                      width={35}
                    />
                  </td>
                </tr>
              );
            }

            const isLastRow = ind === arr.length - 1;

            return (
              <TableRow
                key={borrow_records.id}
                className="text-dark-200 font-medium h-16"
              >
                <TableCell
                  className="font-semibold flex items-center gap-3 cursor-pointer"
                  onClick={() => router.push(`/admin/books/${books.id}`)}
                >
                  <BookCover
                    coverColor={books.coverColor}
                    coverImage={books.coverUrl}
                    variant="extraSmall"
                  />
                  {books.title.length > 20
                    ? `${books.title.substring(0, 20)} ...`
                    : books.title}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="text-blue-600 font-semibold bg-blue-200 border-[1px] border-blue-100">
                        {getInitials(users.fullName ?? "IN")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{users.fullName}</h3>
                      <p className="text-light-500 font-light">
                        {users.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <BorrowedStatusSelector
                    status={borrow_records.status}
                    bookId={books.id}
                    userId={users.id}
                    refetch={refetch}
                    isLastChild={isLastRow}
                  />
                </TableCell>
                <TableCell>{getDate(borrow_records.borrowDate)}</TableCell>
                <TableCell>
                  {borrow_records.returnDate
                    ? getDate(borrow_records.returnDate)
                    : "Not Returend"}
                </TableCell>
                <TableCell>{getDate(borrow_records.dueDate)}</TableCell>
                <TableCell>
                  <SendReceiptEmail
                    body={{
                      author: books.author,
                      title: books.title,
                      genre: books.genre,
                      borrowDate: borrow_records.borrowDate,
                      dueDate: borrow_records.dueDate,
                      email: users.email,
                    }}
                    status={borrow_records.status}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
export default AllBorrowRecordsTable;
