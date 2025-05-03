"use client";

import {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { Edit3, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  bookId: string;
}

function EditOrDeleteBook({ refetch, bookId }: Props) {
  const [action, setAction] = useState<boolean>(false);

  async function editBpok() {}

  async function deleteBook() {
    try {
      setAction(true);
      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || "Failed to delete book");
        return;
      }

      toast.success("Book deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Something went wrong");
    } finally {
      setAction(false);
    }
  }

  return (
    <div className="flex gap-4 items-center">
      <button className="text-sky-500" disabled={action}>
        <Link prefetch={true} href={`/admin/books/update/${bookId}`}>
          <Edit3 size={22} />
        </Link>
      </button>
      <button
        className="text-red cursor-pointer"
        disabled={action}
        onClick={deleteBook}
      >
        <Trash2 size={22} />
      </button>
    </div>
  );
}
export default EditOrDeleteBook;
