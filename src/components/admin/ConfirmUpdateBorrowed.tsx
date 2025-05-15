"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  status: "BORROWED" | "RETURNED" | "LATE RETURNED";
  bookId: string;
  userId: string;
  className?: string;
  onConfirm: () => void;
  disable?: boolean;
}

function ConfirmUpdateBorrowed({
  onConfirm,
  status,
  bookId,
  userId,
  className,
  disable,
}: Props) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    async function updateStatus() {
      const res = await fetch(
        `/api/borrowed/status?bookId=${bookId}&userId=${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || "Failed to update borrowed status.");
        return;
      }

      toast.success(`Borrowed updated to ${status} successfully`);
      setIsConfirmed(false);
      onConfirm();
    }

    if (isConfirmed && status !== "BORROWED") {
      updateStatus();
    }
  }, [isConfirmed, userId, bookId, status, onConfirm]);

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          "capitalize disabled:opacity-50",
          className,
          disable && "!cursor-no-drop"
        )}
        disabled={disable}
      >
        {status.toLocaleLowerCase()}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-semibold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-light">
            <Image
              src="/icons/warning.svg"
              alt="warning"
              width={20}
              height={20}
              className="inline mr-1 mb-1"
            />
            if you are not sure, it will cause problems in the loans!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-admin hover:bg-primary-admin/90 text-white cursor-pointer"
            onClick={() => {
              if (isConfirmed && status === "BORROWED") {
                toast.error("You can not undo status!");
                setIsConfirmed(false);
                return;
              }
              setIsConfirmed(true);
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default ConfirmUpdateBorrowed;
