"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { BorrowedBook, EmailType } from "../../../types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = Pick<BorrowedBook, "status"> & {
  type: EmailType;
  userName: string;
  dueDate: Date;
  borrowDate: Date;
  email: string;
};

function SendReceiptEmail({
  dueDate,
  borrowDate,
  status,
  type,
  userName,
  email,
}: Props) {
  const [send, setSend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const requestBody = {
    status,
    type,
    userName,
    dueDate,
    borrowDate,
    email,
  };

  useEffect(() => {
    async function sendEmail() {
      try {
        setLoading(true);
        const res = await fetch("/api/send/email/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const result = await res.json();

        if (!res.ok) {
          toast.error(result?.error);
          return;
        }

        toast.success("Receipt sent successfully");
        setSend(false);
      } catch (error) {
        toast.error("Somthing went wrong please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (send) sendEmail();
  }, [send]);

  return (
    <Button
      className="!bg-light-300 hover:bg-indigo-100 text-primary-admin disabled:opacity-30"
      onClick={() => setSend(true)}
      disabled={status !== "BORROWED" || loading}
    >
      {loading ? (
        <Image
          src="/icons/loading-circle.svg"
          alt="loading"
          width={18}
          height={18}
        />
      ) : (
        <Image
          src="/icons/admin/receipt.svg"
          alt="receipt"
          width={16}
          height={16}
        />
      )}
      Generate
    </Button>
  );
}
export default SendReceiptEmail;
