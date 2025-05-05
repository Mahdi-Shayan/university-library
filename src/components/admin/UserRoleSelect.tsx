"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ConfirmUpdateUser from "./ConfirmUpdateUser";

interface Props {
  userRole: "ADMIN" | "USER";
  userId: string;
}

function UserRoleSelect({ userRole, userId }: Props) {
  const [role, setRole] = useState<"ADMIN" | "USER">(userRole);
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
        "flex items-center justify-center w-fit",
        role === "ADMIN"
          ? "text-green !bg-green/10"
          : "text-red-800 !bg-red-800/10"
      )}
      onClick={(e) => {
        e.stopPropagation();
        setOpenSelector((pre) => !pre);
      }}
    >
      {role.toLowerCase()}
      <div
        className={cn(
          "absolute left-[110%] -top-3 flex flex-col gap-2 p-3 bg-white rounded-sm z-30 shadow-sm transition-all duration-100",
          openSelector
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ConfirmUpdateUser
          userId={userId}
          role="ADMIN"
          className={cn(
            baseClass,
            "flex items-center text-green !bg-green/10"
          )}
          onConfirm={() => {
            setRole("ADMIN");
            setOpenSelector(false);
          }}
        />
        <ConfirmUpdateUser
          userId={userId}
          role="USER"
          className={cn(
            baseClass,
            "flex items-center text-red-800 !bg-red-800/10"
          )}
          onConfirm={() => {
            setRole("USER");
            setOpenSelector(false);
          }}
        />
      </div>
    </div>
  );
}

export default UserRoleSelect;
