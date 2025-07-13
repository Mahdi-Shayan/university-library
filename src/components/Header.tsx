"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, X, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { getInitials } from "@/utils";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const navClasses = cn(
    "flex items-center gap-5 ease-out duration-400",
    isMobile
      ? "fixed flex-col-reverse justify-end right-0 top-0 h-screen w-70 bg-dark-300 pt-30 shadow-2xl z-50"
      : "",
    isMobile && !open
      ? "translate-x-80 rounded-l-[80%]"
      : "translate-x-0 rounded-l-0"
  );

  const linkClasses = (path: string) =>
    cn(
      "text-base cursor-pointer capitalize",
      pathname === path ? "text-primary" : "text-light-100",
      isMobile && "text-2xl",
      isMobile && (open ? "opacity-100" : "opacity-0")
    );

  const avatarClasses = cn(
    isMobile
      ? "w-26 h-26 border-8 border-dark-600/25 shadow-xl mb-6 text-2xl"
      : "w-[35px] h-[35px]",
    isMobile && (open ? "opacity-100" : "opacity-0")
  );

  return (
    <header>
      <nav className="flex items-center justify-between pt-10">
        <Link href="/" className="flex items-center gap-5">
          <Image src="/icons/logo.svg" alt="logo" height={40} width={40} />
          <h2 className="text-[28px] font-semibold max-md:hidden">
            BookWise
          </h2>
        </Link>

        <ul
          className={navClasses}
          style={{ transition: "translate 0.4s, border-radius 0.4s" }}
        >
          <li className={linkClasses("/admin")}>
            <Link href="/admin">Admin</Link>
          </li>
          <li className={linkClasses("/library")}>
            <Link href="/library">library</Link>
          </li>
          <li className={linkClasses("/")}>
            <Link href="/">home</Link>
          </li>
          <li
            className={cn(
              isMobile && (open ? "opacity-100" : "opacity-0")
            )}
          >
            <Link href="/my-profile">
              <Avatar className={avatarClasses}>
                <AvatarFallback className="text-black font-semibold bg-primary">
                  {getInitials(session.user?.name ?? "IN")}
                </AvatarFallback>
              </Avatar>
            </Link>
          </li>
          <li>
            <Button
              className={cn(
                "w-6 !bg-transparent",
                isMobile && (open ? "opacity-100" : "opacity-0")
              )}
              onClick={() => signOut()}
            >
              <LogOut className="text-red !w-6 !h-6" />
            </Button>
          </li>
        </ul>

        {isMobile && (
          <Button
            onClick={() => setOpen((prev) => !prev)}
            className="fixed right-5 !bg-transparent text-primary z-50"
          >
            {open ? (
              <X className="!w-9 !h-9" />
            ) : (
              <Menu className="!w-9 !h-9" />
            )}
          </Button>
        )}
      </nav>
    </header>
  );
}
