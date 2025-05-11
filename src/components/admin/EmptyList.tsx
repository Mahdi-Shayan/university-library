import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  title: string;
  message: string;
  imageUrl: string;
  type?: "small" | "medium";
}

function EmptyList({ title, message, imageUrl, type = "medium" }: Props) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-2 w-full text-center",
        type === "medium" ? "h-115" : "h-full"
      )}
    >
      <Image
        src={imageUrl}
        alt="no borrowed book"
        height={type === "small" ? 300 : 350}
        width={type === "small" ? 300 : 350}
        className="mb-5"
      />
      <h2
        className={cn(
          "font-semibold",
          type === "small"
            ? "text-xl max-md:text-lg"
            : "text-2xl max-md:text-xl"
        )}
      >
        {title}
      </h2>
      <p className="text-light-500 max-md:text-sm">{message}</p>
    </section>
  );
}
export default EmptyList;
