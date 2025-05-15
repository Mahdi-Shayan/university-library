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
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  type: "status" | "role";
  role?: "ADMIN" | "USER";
  status?: "PENDING" | "APPROVED" | "REJECTED";
  userId: string;
  className?: string;
  onConfirm: () => void;
}

function ConfirmUpdateUser({
  role,
  status,
  type,
  userId,
  className,
  onConfirm,
}: Props) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (type === "status" && !status) {
    throw new Error("User status require");
  }
  if (type === "role" && !role) {
    throw new Error("User role require");
  }

  useEffect(() => {
    async function deleteUser() {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || "Failed to update user role");
        return;
      }
    }
    async function updateUser() {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, status }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || "Failed to update user role");
        return;
      }

      toast.success("User role updated successfully");
      setIsConfirmed(false);
      onConfirm();
    }

    if (isConfirmed) {
      updateUser();
    }
    if (isConfirmed && status === "REJECTED") {
      deleteUser()
    }
  }, [isConfirmed, onConfirm, role, status, userId]);

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn("capitalize", className)}>
        {type === "role"
          ? role?.toLocaleLowerCase()
          : status?.toLocaleLowerCase()}
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
            {role
              ? role === "ADMIN"
                ? "This action allows the user to access the admin dashboard. make sure Then change the user role."
                : " This action prevents the user from accessing the admin"
              : status === "APPROVED"
                ? "User allows to borrow books, Be sure then chnage status to APPROVED."
                : status === "PENDING"
                  ? "User can not borrow books, be sure then change the status."
                  : "This action going to DELETE the user!"}
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
