import { useQuery } from "@tanstack/react-query";

async function fetchData() {
  const res = await fetch("/api/users/request");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export function useUsersRequest() {
  return useQuery({
    queryKey: ["request", "all"],
    queryFn: () => fetchData(),
  });
}
