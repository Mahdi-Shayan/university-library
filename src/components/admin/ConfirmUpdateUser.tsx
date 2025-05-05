"use client";

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
import { FileWarning } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  role: "ADMIN" | "USER";
  userId: string;
  className?: string;
  onConfirm: () => void;
}

function ConfirmUpdateUser({ role, userId, className, onConfirm }: Props) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    async function updateUser() {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || 'Faild to update user role');
        return;
      }

      toast.success("User role updated successfully");
      setIsConfirmed(false);
      onConfirm();
    }

    if (isConfirmed) updateUser();
  }, [isConfirmed]);

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn("capitalize", className)}>
        {role.toLocaleLowerCase()}
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
            {role === "ADMIN"
              ? "This action allows the user to access the admin dashboard. make sure Then change the user role."
              : " This action prevents the user from accessing the admin"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-admin hover:bg-primary-admin/90 text-white cursor-pointer"
            onClick={() => setIsConfirmed(true)}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default ConfirmUpdateUser;
