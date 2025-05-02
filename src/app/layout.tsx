import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management solution.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        {children}
        <Toaster
          expand={true}
          toastOptions={{
            classNames: {
              default: "!text-white",
              error: "!bg-red-700",
              success: "!bg-green",
              description: "!text-white",
            },
          }}
        />
      </body>
    </html>
  );
}
