"use client"

import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

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
  className?: string;
}

function BookCover({
  variant = "regular",
  coverColor,
  className,
  coverImage,
}: Props) {
  return (
    <>
      <div
        className={cn(
          "relative transition-all duration-300",
          variantStyles[variant],
          className
        )}
      >
        <BookCoverSvg coverColor={coverColor} />
        <div
          className="absolute z-10"
          style={{ left: "12%", width: "87.5%", height: "88%" }}
        >
          <IKImage
            path={coverImage}
            urlEndpoint={config.env.imageKit.urlEndpoint}
            alt="book cover"
            fill
            className="rounded-sm object-fill"
            lqip={{ active: true }}
            priority={variant === "wide" ? true : undefined}
          />
        </div>
      </div>
    </>
  );
}

export default BookCover;
