import { useQuery } from "@tanstack/react-query";

async function fetchData(id?: string) {
  const endpoint = id ? `/api/users/${id}` : "/api/users";

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
