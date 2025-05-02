import { useQuery } from "@tanstack/react-query";

async function fetchData(id?: string) {
  const endpoint = `/api/users/${id && id}`;

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export function useUsers(id?: string) {
  const queryKey = id ? ["users", id] : ["users", "all"];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(id),
  });
}
