"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/utils";
import { Session } from "next-auth";

function Header({ session }: { session: Session }) {
  const pathname: string = usePathname();
  return (
    <>
      <header>
        <nav className="flex items-center justify-between pt-10">
          <Link
            href="/"
            className="flex items-center gap-5 text-[28px] font-semibold max-sm:text-xl"
          >
            <Image
              src="/icons/logo.svg"
              alt="logo"
              height={40}
              width={40}
            />
            BookWise
          </Link>
          <ul className="flex flex-row items-center gap-5">
            <li
              className={cn(
                "text-base cursor-pointer capitalize",
                pathname === "/library" ? "text-primary" : "text-light-100"
              )}
            >
              <Link href="/library">library</Link>
            </li>
            <li
              className={cn(
                "text-base cursor-pointer capitalize",
                pathname === "/" ? "text-primary" : "text-light-100"
              )}
            >
              <Link href="/">home</Link>
            </li>
            <li>
              <Link href="/my-profile">
                <Avatar className="w-[35px] h-[35px]">
                  <AvatarFallback className="text-black font-semibold bg-primary">
                    {getInitials(session.user?.name || "IN")}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
