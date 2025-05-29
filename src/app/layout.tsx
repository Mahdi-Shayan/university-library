import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management solution.",
};

export const lightFont = localFont({
  src: "../fonts/IBMPlexSans-Regular.ttf",
  variable: "--font-light",
});

export const normalFont = localFont({
  src: "../fonts/IBMPlexSans-Medium.ttf",
  variable: "--font-normal",
});

export const semiboldFont = localFont({
  src: "../fonts/IBMPlexSans-SemiBold.ttf",
  variable: "--font-semibold",
});

export const boldFont = localFont({
  src: "../fonts/IBMPlexSans-Bold.ttf",
  variable: "--font-bold",
});

export const bebasFont = localFont({
  src: "../fonts/BebasNeue-Regular.ttf",
  variable: "--font-bebas-neue",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${lightFont.variable} ${normalFont.variable} ${semiboldFont.variable} ${boldFont.variable} ${bebasFont.variable}`}
    >
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
