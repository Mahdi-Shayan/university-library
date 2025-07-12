import Image from "next/image";
import { ReactNode } from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { EmailContextProvider } from "@/lib/contexts/emailContext";

async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (session) redirect("/");

  return (
    <EmailContextProvider>
      <main className="auth-container">
        <section className="auth-form">
          <div className="auth-box">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/logo.svg"
                alt="logo"
                width={37}
                height={37}
                priority={true}
                className="max-md:size-7"
              />
              <h1 className="md:text-2xl text-xl font-semibold">BookWise</h1>
            </div>
            <div>{children}</div>
          </div>
        </section>
        <section
          className="auth-illustration"
        />
      </main>
    </EmailContextProvider>
  );
}

export default Layout;
