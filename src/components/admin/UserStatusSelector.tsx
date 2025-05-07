"use client";

import { useEffect, useRef, useState } from "react";
import ConfirmUpdateUser from "./ConfirmUpdateUser";
import { cn } from "@/lib/utils";

interface Props {
  userId: string;
  userStatus: "PENDING" | "APPROVED" | "REJECTED";
}

function UserStatusSelector({ userId, userStatus }: Props) {
  const [status, setStatus] = useState<
    "PENDING" | "APPROVED" | "REJECTED"
  >(userStatus);
  const [openSelector, setOpenSelector] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const baseClass =
    "relative rounded-[4px] capitalize w-max h-7 p-4 cursor-pointer";

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
        "flex items-center justify-center w-fit",
        status === "APPROVED"
          ? "text-green !bg-green/10"
          : status === "PENDING"
            ? "text-yellow-500 !bg-yellow-400/10"
            : "text-red-800 !bg-red-800/10"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setOpenSelector((pre) => !pre);
      }}
    >
      <p>Account {status.toLowerCase()}</p>
      <div
        className={cn(
          "absolute right-[110%] -top-13 flex flex-col gap-2 p-3 bg-white rounded-sm z-30 shadow-sm transition-all duration-100",
          openSelector
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ConfirmUpdateUser
          type="status"
          userId={userId}
          status="APPROVED"
          className={cn(
            baseClass,
            "flex items-center text-green !bg-green/10"
          )}
          onConfirm={() => {
            setStatus("APPROVED");
            setOpenSelector(false);
          }}
        />
        <ConfirmUpdateUser
          type="status"
          userId={userId}
          status="PENDING"
          className={cn(
            baseClass,
            "flex items-center text-yellow-500 !bg-yellow-400/10"
          )}
          onConfirm={() => {
            setStatus("PENDING");
            setOpenSelector(false);
          }}
        />
        <ConfirmUpdateUser
          type="status"
          userId={userId}
          status="REJECTED"
          className={cn(
            baseClass,
            "flex items-center text-red-800 !bg-red-800/10"
          )}
          onConfirm={() => {
            setStatus("REJECTED");
            setOpenSelector(false);
          }}
        />
      </div>
    </div>
  );
}
export default UserStatusSelector;
