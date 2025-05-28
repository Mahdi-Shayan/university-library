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
      <head>
        {/* Preload fonts */}
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
          href="/fonts/IBMPlexSans-SemiBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-Bold.ttf"
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
        <link rel="preload" href="/images/auth-illustration.webp" as="image" />

        {/* connections */}
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
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
