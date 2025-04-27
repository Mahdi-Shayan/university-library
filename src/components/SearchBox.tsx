import Form from "next/form";
import Image from "next/image";

function SearchBox({ query }: { query?: string }) {
  return (
    <>
      <Form
        id="search-form"
        action="/library"
        scroll={false}
        className="search"
      >
        <button type="submit" className="cursor-pointer">
          <Image
            src="/icons/search-fill.svg"
            alt="search"
            width={25}
            height={25}
          />
        </button>
        <input
          id="search-bar"
          className="search-input"
          name="query"
          type="text"
          defaultValue={query}
          placeholder="Search Books"
        />
      </Form>
    </>
  );
}

export default SearchBox;
