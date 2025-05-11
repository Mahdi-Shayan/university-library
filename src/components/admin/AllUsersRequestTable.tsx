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
import Image from "next/image";
import dayjs from "dayjs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/utils";
import { useState } from "react";
import IDCardPreview from "../IDCardPreview";
import { cn } from "@/lib/utils";
import { useUsersRequest } from "@/hooks/useUsersRequest";
import { UserParams } from "../../../types";
import UserStatusSelector from "./UserStatusSelector";
import ShowError from "./ShowError";
import EmptyList from "./EmptyList";

function AllUsersRequestTable() {
  const { data, isLoading, isError } = useUsersRequest();
  const [IDCardFile, setIDCardFile] = useState<string>();

  if (isLoading)
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

  if (!data.length) {
    return (
      <EmptyList
        title="No Pending Requests"
        message="There are no pending requests awaiting your review at this time."
        imageUrl="/images/no-account-request.png"
      />
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
          A list of your all users request ({data.length})
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-light-300 !border-0">
            <TableHead className="w-[35%]">Name</TableHead>
            <TableHead className="min-w-35">Date Joined</TableHead>
            <TableHead className="min-w-35">University ID No</TableHead>
            <TableHead className="min-w-35">University ID Card</TableHead>
            <TableHead className="min-w-35">Action</TableHead>
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
                  <p className="text-light-500 font-light">{user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                {dayjs(user.createdAt).format("MMM DD YYYY")}
              </TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <button
                  className="flex items-center gap-[6px] cursor-pointer text-blue-400 hover:underline"
                  onClick={() => setIDCardFile(user.universityCard)}
                  onBlur={() => setIDCardFile(undefined)}
                >
                  <Image
                    src="/icons/admin/eye.svg"
                    alt="eye icon"
                    height={17}
                    width={17}
                  />
                  View ID Card
                </button>
              </TableCell>
              <TableCell>
                <UserStatusSelector
                  userId={user.id}
                  userStatus={user.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
export default AllUsersRequestTable;
