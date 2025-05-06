import { useQuery } from "@tanstack/react-query";

type IDType = "all" | "allWidthDetails" | "userId" | "bookId";
interface Props {
  id?: string;
  type: IDType;
}

async function fetchData({ id, type }: Props) {
  const endpoint =
    type === "all"
      ? "/api/borrowed"
      : type === "allWidthDetails"
      ? "/api/borrowed?withDetails=true"
      : `/api/borrowed/${type}/${id}`;

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export function useBorrowedBooks(type: IDType, id?: string) {
  const queryKey = id ? ["borrowed", id] : ["borrowed", "all"];

  if (type !== "all" && type !== "allWidthDetails" && !id)
    throw new Error(`${type} ID required`);

  return useQuery({
    queryKey,
    queryFn: () => fetchData({ id, type }),
  });
}
