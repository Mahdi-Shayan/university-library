"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  className?: string;
  booksLength: number;
  pageNumber: number;
}

function PaginationData({ className, booksLength, pageNumber }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleChangingPage(page: number): void {
    router.push(pathName + "?" + createQueryString("page", `${page}`));
  }

  const allPages = Math.ceil(booksLength / 12);

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => {
                handleChangingPage(pageNumber !== 1 ? pageNumber - 1 : 1);
              }}
            />
          </PaginationItem>
          {Array.from(new Array(allPages)).map((_, ind) => (
            <PaginationItem key={ind}>
              <PaginationLink
                className="cursor-pointer"
                isActive={pageNumber === ind + 1}
                onClick={() => {
                  handleChangingPage(ind + 1);
                }}
              >
                {ind + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {Math.ceil(booksLength / 12) > 5 && <PaginationEllipsis />}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => {
                handleChangingPage(
                  pageNumber !== allPages ? pageNumber + 1 : allPages
                );
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
export default PaginationData;
