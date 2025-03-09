"use client";

import Link from "next/link";
import { AdminSideBarLinks } from "../../../types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Links({ link }: { link: AdminSideBarLinks }) {
  const pathname = usePathname();

  const isSelected: boolean =
    (link.route !== "/admin" &&
      pathname.includes(link.route) &&
      link.route.length > 1) ||
    pathname === link.route;

  return (
    <>
      <Link href={link.route} key={link.route}>
        <div
          className={cn(
            "link",
            isSelected && "bg-primary-admin shadow-sm"
          )}
        >
          <div className="relative size-5">
            <Image
              src={link.img}
              alt="icon"
              fill
              className={`${isSelected ? "brightness-0 invert" : ""}`}
            />
          </div>
          <p className={cn(isSelected ? "text-white" : "text-dark-100")}>
            {link.text}
          </p>
        </div>
      </Link>
    </>
  );
}

export default Links;
