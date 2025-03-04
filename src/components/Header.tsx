"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Header() {
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
          <ul className="flex flex-row gap-5">
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
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
