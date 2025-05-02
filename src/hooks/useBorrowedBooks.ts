import { useQuery } from "@tanstack/react-query";

type IDType = "all" | "userId" | "bookId";

async function fetchData({ id, type }: { id?: string; type: IDType }) {
  const endpoint =
    type === "all" ? `/api/borrowed` : `/api/borrowed/${type}/${id}`;

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export function useBorrowedBooks(type: IDType, id?: string) {
  const queryKey = id ? ["borrowed", id] : ["borrowed", "all"];

  if (type !== "all" && !id) throw new Error(`${type} ID required`);

  return useQuery({
    queryKey,
    queryFn: () => fetchData({ id, type }),
  });
}
