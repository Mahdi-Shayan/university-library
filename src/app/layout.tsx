import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Head from "next/head";

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management solution.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Preload کردن فونت‌ها */}
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-semibold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/BebasNeue-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/images/pattern.webp" as="image" />
        <link rel="preload" href="/images/illustration.webp" as="image" />
      </Head>
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
