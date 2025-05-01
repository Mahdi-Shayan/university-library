import HomeBookList from "@/components/HomeBookList";
import SearchBox from "@/components/SearchBox";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import Image from "next/image";
import { SampleBooks } from "../../../../types";
import PaginationData from "@/components/PaginationData";
import ClearSearchQuery from "@/components/ClearSearchQuery";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ query?: string; page?: number }>;
}

async function Library({ searchParams }: Props) {
  const { query, page } = await searchParams;

  const allBooks = await db.select().from(books);
  const searchBooks: SampleBooks[] = allBooks.filter((book) =>
    book.title.toLowerCase().includes(query?.toLowerCase() as string)
  );

  const pageNumber = Number(page) || 1;

  return (
    <div className="relative flex flex-col">
      <div className="flex flex-col gap-3 items-center max-w-[630px] mx-auto">
        <p className="capitalize font-bebas-neue text-light-100 text-xl tracking-[5px] max-lg:text-lg max-sm:text-sm">
          Discover Your Next Great Read:
        </p>
        <div className="search-title">
          <h1>Explore and Search for </h1>
          <h1>
            <span className="text-light-200">Any Book</span> In Our Library
          </h1>
        </div>
        <SearchBox query={query} />
      </div>
      <div className="my-25">
        <h2 className="text-3xl max-md:text-[26px] font-semibold text-light-100">
          Search Result {query && searchBooks && "for"}{" "}
          {query && searchBooks.length > 0 && (
            <span className="text-light-200">{query}</span>
          )}
        </h2>

        {/* IF SEARCHING */}
        {query && searchBooks.length > 0 ? (
          <HomeBookList
            books={searchBooks.slice(
              pageNumber ? pageNumber * 12 - 12 : 0,
              pageNumber ? pageNumber * 12 : 12
            )}
            title=""
          />
        ) : // NO RESULT
        query && searchBooks.length === 0 ? (
          <div className="flex flex-col gap-4 items-center max-w-[360px] mt-20 mx-auto text-center">
            <Image
              src="/images/no-books.png"
              alt="No Book"
              width={200}
              height={200}
            />
            <h3 className="text-2xl font-bold">No Result Found</h3>
            <p className="text-light-100">
              We couldn’t find any books matching your search. Try using
              different keywords or check for typos.
            </p>
            <ClearSearchQuery />
          </div>
        ) : (
          // IF NOT SEARCHING
          <HomeBookList
            books={allBooks.slice(
              pageNumber ? pageNumber * 12 - 12 : 0,
              pageNumber ? pageNumber * 12 : 12
            )}
            title=""
          />
        )}
      </div>
      {!query
        ? allBooks.length > 12 && (
            <PaginationData
              booksLength={allBooks.length}
              pageNumber={pageNumber}
            />
          )
        : searchBooks.length > 12 && (
            <PaginationData
              booksLength={searchBooks.length}
              pageNumber={pageNumber}
            />
          )}
    </div>
  );
}
export default Library;
