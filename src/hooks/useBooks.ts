import { useQuery } from "@tanstack/react-query";

async function fetchData(id?: string) {
  const endpoint = id ? `/api/books/${id}` : '/api/books';

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export function useBooks(id?: string) {
  const queryKey = id ? ["books", id] : ["books", "all"];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(id),
  });
}
