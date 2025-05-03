"use client";

import { AlertCircle, MoveLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ShowErrorProps {
  title: string;
  message: string;
}

function ShowError({ title, message }: ShowErrorProps) {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-5 items-center justify-center h-[calc(100vh-300px)] w-full">
      <h2 className="flex items-center gap-5 text-5xl font-semibold">
        <AlertCircle size={50} className="text-red" />
        {title}
      </h2>
      <p className="text-2xl font-normal">{message}</p>
      <Button
        className="bg-primary-admin hover:bg-primary-admin text-white p-5 w-30"
        onClick={() => router.back()}
      >
        <MoveLeft />
        Go Back
      </Button>
    </section>
  );
}

export default ShowError;
