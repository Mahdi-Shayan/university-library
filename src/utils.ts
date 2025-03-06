export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
