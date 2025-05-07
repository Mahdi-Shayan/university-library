"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { ReceiptParams } from "../../../types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function SendReceiptEmail({ body }: ReceiptParams) {
  const [send, setSend] = useState<boolean>(false);

  useEffect(() => {
    async function sendReceiptEmail() {
      try {
        const res = await fetch("/api/send/receipt/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const result = await res.json();

        if (!res.ok) {
          toast.error(result?.error);
          return;
        }
        console.log("Email sent");

        toast.success("Receipt sent successfully");
        setSend(false);
      } catch (error) {
        toast.error("Somthing went wrong please try again later.");
      }
    }

    if (send) sendReceiptEmail();
  }, [send, body]);

  return (
    <Button
      className="bg-light-300 hover:bg-indigo-100 text-primary-admin"
      onClick={() => setSend(true)}
    >
      <Image
        src="/icons/admin/receipt.svg"
        alt="receipt"
        width={16}
        height={16}
      />
      Generate
    </Button>
  );
}
export default SendReceiptEmail;
