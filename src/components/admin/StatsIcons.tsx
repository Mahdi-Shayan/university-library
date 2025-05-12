"use client";

import Image from "next/image";

function StatsIcons({ type }: { type: "increase" | "decrease" }) {
  return (
    <div>
      {type === "increase" ? (
        <Image
          src="/icons/admin/increase.svg"
          alt="Increase"
          width={18}
          height={18}
        />
      ) : (
        <Image
          src="/icons/admin/decrease.svg"
          alt="Decrease"
          width={18}
          height={18}
        />
      )}
    </div>
  );
}
export default StatsIcons;
