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
import { BorrowedBook, UserParams } from "../../../types";
import Image from "next/image";
import dayjs from "dayjs";
import EditOrDeleteBook from "./EditOrDeleteBook";
import { useUsers } from "@/hooks/useUsers";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/utils";
import UserRoleSelect from "./UserRoleSelect";
import { useBorrowedBooks } from "@/hooks/useBorrowedBooks";
import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import IDCardPreview from "../IDCardPreview";
import { cn } from "@/lib/utils";

function AllUsersTable() {
  const { data, isLoading, refetch } = useUsers();
  const { data: borrowed, isLoading: loading } = useBorrowedBooks("all");
  const [IDCardFile, setIDCardFile] = useState<string>();

  if (isLoading || loading)
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

  function getBorrowedLength(id: string): number {
    return (borrowed as BorrowedBook[]).filter((b) => b.userId === id)
      .length;
  }

  return (
    <section className="relative mt-7 w-full">
      {IDCardFile && (
        <div className="fixed top-[50%] left-[50%] translate-[-50%] h-70 w-full rounded-sm overflow-hidden z-50">
          <IDCardPreview path={IDCardFile} />
        </div>
      )}
      <Table
        className={cn(
          "rounded-sm overflow-hidden",
          IDCardFile && "blur-[2px]"
        )}
      >
        <TableCaption>
          A list of your all users ({data.length})
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-light-300 !border-0">
            <TableHead className="w-[32%]">Name</TableHead>
            <TableHead className="min-w-35">Date Joined</TableHead>
            <TableHead className="min-w-25">Role</TableHead>
            <TableHead className="min-w-30">Books Params</TableHead>
            <TableHead className="min-w-35">University ID No</TableHead>
            <TableHead className="min-w-35">University ID Card</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as UserParams[]).map((user) => (
            <TableRow key={user.id} className="text-dark-200 font-medium">
              <TableCell className="flex items-center gap-3">
                <Avatar className="w-11 h-11">
                  <AvatarFallback className="text-blue-600 font-semibold bg-blue-200 border-[1px] border-blue-100">
                    {getInitials(user.fullName ?? "IN")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user.fullName}</h3>
                  <p className="text-light-500">{user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                {dayjs(user.createdAt).format("MMM DD YYYY")}
              </TableCell>
              <TableCell>
                <UserRoleSelect userRole={user.role} userId={user.id} />
              </TableCell>
              <TableCell>{getBorrowedLength(user.id)}</TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <button
                  className="flex items-center gap-2 text-blue-400 hover:underline cursor-pointer"
                  onClick={() => setIDCardFile(user.universityCard)}
                  onBlur={() => setIDCardFile(undefined)}
                >
                  View ID Card <SquareArrowOutUpRight size={18} />
                </button>
              </TableCell>
              <TableCell>
                <EditOrDeleteBook
                  refetch={refetch}
                  id={user.id}
                  dataType="users"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
export default AllUsersTable;
