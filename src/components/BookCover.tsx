import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";

type VariantStyles =
  | "extraSmall"
  | "small"
  | "medium"
  | "regular"
  | "wide";

const variantStyles: Record<VariantStyles, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  variant?: VariantStyles;
  coverColor: string;
  coverImage: string;
  classname?: string;
}

function BookCover({
  variant = "regular",
  coverColor,
  classname,
  coverImage,
}: Props) {
  return (
    <>
      <div
        className={cn(
          "relative transition-all duration-300",
          variantStyles[variant],
          classname
        )}
      >
        <BookCoverSvg coverColor={coverColor} />
        <div
          className="absolute z-10"
          style={{ left: "12%", width: "87.5%", height: "88%" }}
        >
          <Image
            src={coverImage}
            alt="book cover"
            fill
            className="rounded-sm object-fill"
          />
        </div>
      </div>
    </>
  );
}

export default BookCover;
