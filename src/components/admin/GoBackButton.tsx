"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function GoBackButton() {
  const router = useRouter();
  return (
    <Button className="back-btn" onClick={() => router.back()}>
      <MoveLeft />
      Go Back
    </Button>
  );
}
export default GoBackButton;
