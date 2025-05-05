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
  id: string;
  dataType: "users" | "books";
}

function EditOrDeleteBook({ refetch, id, dataType }: Props) {
  const [action, setAction] = useState<boolean>(false);

  const type = dataType === "users" ? "user" : "book";
  const endPoint =
    dataType === "users" ? `/api/users/${id}` : `/api/books/${id}`;

  async function deleteData() {
    try {
      setAction(true);
      const res = await fetch(endPoint, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || `Failed to delete ${type}`);
        return;
      }

      toast.success(`${type.toUpperCase()} deleted successfully`);
      refetch();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast.error("Something went wrong");
    } finally {
      setAction(false);
    }
  }

  return (
    <div className="flex gap-4 items-center">
      {dataType === "books" && (
        <button className="text-sky-500" disabled={action}>
          <Link prefetch={true} href={`/admin/books/update/${id}`}>
            <Edit3 size={22} />
          </Link>
        </button>
      )}
      <button
        className="text-red cursor-pointer"
        disabled={action}
        onClick={deleteData}
      >
        <Trash2 size={22} />
      </button>
    </div>
  );
}
export default EditOrDeleteBook;
