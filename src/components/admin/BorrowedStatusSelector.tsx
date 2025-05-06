"use client";

import { useEffect, useRef, useState } from "react";
import ConfirmUpdateBorrowed from "./ConfirmUpdateBorrowed";
import { cn } from "@/lib/utils";
import {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

type Status = "BORROWED" | "RETURNED" | "LATE RETURNED";
interface Props {
  status: Status;
  bookId: string;
  userId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  isLastChild: boolean;
}

function BorrowedStatusSelector({
  status,
  bookId,
  refetch,
  userId,
  isLastChild
}: Props) {
  const [borrowedStatus, setBorrowedStatus] = useState<Status>(status);
  const [openSelector, setOpenSelector] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const baseClass =
    "relative rounded-full capitalize w-max h-7 p-3 cursor-pointer";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelector(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={cn(
        baseClass,
        "flex items-center justify-center",
        borrowedStatus === "BORROWED"
          ? "text-purple-600 !bg-purple-400/10"
          : borrowedStatus === "RETURNED"
          ? "text-cyan-700 !bg-cyan-700/10"
          : "text-red-800 !bg-red-800/10"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setOpenSelector((pre) => !pre);
      }}
    >
      {borrowedStatus.toLowerCase()}
      <div
        className={cn(
          "absolute left-[110%] flex flex-col gap-3 p-3 bg-white rounded-sm z-30 shadow-lg transition-all duration-100",
          isLastChild ? 'bottom-0' : 'top-0 ',
          openSelector
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ConfirmUpdateBorrowed
          bookId={bookId}
          userId={userId}
          status="BORROWED"
          className={cn(
            baseClass,
            "flex items-center text-purple-600 !bg-purple-400/10"
          )}
          onConfirm={() => {
            setBorrowedStatus("BORROWED");
            setOpenSelector(false);
            refetch();
          }}
          disable={status !== "BORROWED"}
        />
        <ConfirmUpdateBorrowed
          bookId={bookId}
          userId={userId}
          status="RETURNED"
          className={cn(
            baseClass,
            "flex items-center text-cyan-700 !bg-cyan-700/10"
          )}
          onConfirm={() => {
            setBorrowedStatus("RETURNED");
            setOpenSelector(false);
            refetch();
          }}
        />
        <ConfirmUpdateBorrowed
          bookId={bookId}
          userId={userId}
          status="LATE RETURNED"
          className={cn(
            baseClass,
            "flex items-center text-red-800 !bg-red-800/10"
          )}
          onConfirm={() => {
            setBorrowedStatus("LATE RETURNED");
            setOpenSelector(false);
            refetch();
          }}
        />
      </div>
    </div>
  );
}
export default BorrowedStatusSelector;
