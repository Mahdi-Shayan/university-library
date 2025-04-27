"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function ClearSearchQuery() {
  const router = useRouter();
  const searchbar = document.querySelector(
    "#search-bar"
  ) as HTMLInputElement;

  function clearQuery() {
    router.push("/library");
    searchbar.value = "";
  }

  return (
    <Button
      className="!font-bebas-neue text-black py-6 text-xl w-full"
      onClick={clearQuery}
    >
      Clear Search
    </Button>
  );
}
export default ClearSearchQuery;
