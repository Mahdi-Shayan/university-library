import { CalendarDays, Dot, Eye } from "lucide-react";
import { BorrowedBook, SampleBooks, UserParams } from "../../../types";
import BookCover from "../BookCover";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/utils";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import EmptyList from "./EmptyList";
import { Button } from "../ui/button";

interface Props {
  type: "users" | "books";
  users: UserParams[];
  borrowedBooks: BorrowedBook[];
  books: SampleBooks[];
  className?: string;
}

function HomeRequestsList({
  type,
  users,
  borrowedBooks,
  books,
  className,
}: Props) {
  function getBookDetails(id: string) {
    return books.filter((b) => b.id === id);
  }
  function getUserDetails(id: string) {
    return users.filter((u) => u.id === id);
  }
  function getAccountRequests() {
    return users.filter((u) => u.status === "PENDING");
  }

  return (
    <section
      className={cn(
        "relative bg-white rounded-2xl p-5 h-[450px] overflow-hidden",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-xl">
          {type === "books" ? "Borrow Requests" : "Account Requests"}
        </h3>
        <Button className="text-primary-admin font-normal !bg-blue-50">
          <Link
            href={
              type === "books"
                ? "/admin/borrow-records"
                : "/admin/account-requests"
            }
          >
            View All
          </Link>
        </Button>
      </div>
      {type === "books" ? (
        borrowedBooks.length > 0 ? (
          <div className="rounded-2xl space-y-3 h-full overflow-y-auto overflow-x-hidden mt-5 pb-5">
            {borrowedBooks.map((borrowed) => {
              const [{ coverColor, coverUrl, title, author, genre, id }] =
                getBookDetails(borrowed.bookId);

              const [{ fullName }] = getUserDetails(borrowed.userId);

              return (
                <div
                  key={borrowed.id}
                  className="flex justify-between bg-light-300 p-5"
                >
                  <div className="flex gap-5">
                    <BookCover
                      coverColor={coverColor}
                      coverImage={coverUrl}
                      variant="small"
                    />
                    <div className="space-y-1">
                      <p className="text-[16px] font-medium">{title}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <p>
                          By{" "}
                          {author.length > 15
                            ? `${author.substring(0, 15)} ...`
                            : author}
                        </p>
                        <Dot size={25} />
                        <p>{genre}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-dark-700 mt-[6px]">
                        <Avatar className="w-5 h-5 text-[9px]">
                          <AvatarFallback className="text-blue-600 font-light bg-blue-200 border-[1px] border-blue-100">
                            {getInitials(fullName ?? "IN")}
                          </AvatarFallback>
                        </Avatar>
                        <p>{fullName}</p>
                        <div className="flex items-center gap-1 ml-5">
                          <CalendarDays size={17} />
                          <p>
                            {dayjs(borrowed.borrowDate).format("DD/MM/YY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-dark-700 bg-white h-max p-1 rounded-sm cursor-pointer">
                    <Link href={`/admin/books/${id}`}>
                      <Eye size={20} />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* LIST EFFECT*/}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-white to-transparent z-20" />
          </div>
        ) : (
          <EmptyList
            title="No Borrowed Books"
            message="There are no borrowed books at this time."
            imageUrl="/images/no-borrowed.png"
            type="small"
          />
        )
      ) : getAccountRequests().length > 0 ? (
        <div className="grid grid-cols-2 max-xl:!grid-cols-1 max-lg:!grid-cols-2 max-md:!grid-cols-1 auto-rows-max gap-4 mt-5 pb-15 h-full overflow-y-auto overflow-x-hidden">
          {getAccountRequests().map((user) => (
            <div
              className="flex flex-col items-center justify-center rounded-2xl h-max p-5 bg-light-300"
              key={user.id}
            >
              <Avatar className="w-12 h-12 text-base">
                <AvatarFallback className="text-blue-600 font-light bg-blue-200 border-[1px] border-blue-100">
                  {getInitials(user.fullName ?? "IN")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center mt-4">
                <p className="text-[16px] font-normal">{user.fullName}</p>
                <p className="text-dark-700 text-sm">{user.email}</p>
              </div>
            </div>
          ))}

          {/* LIST EFFECT*/}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-20" />
        </div>
      ) : (
        <EmptyList
          title="No Pending Requests"
          message="There are no pending requests awaiting your review at this time."
          imageUrl="/images/no-account-request.png"
          type="small"
        />
      )}
    </section>
  );
}
export default HomeRequestsList;
