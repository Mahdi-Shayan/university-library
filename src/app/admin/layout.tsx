import { ReactNode } from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) redirect("sign-in");

  return (
    <>
      <main className="flex min-h-screen w-full">
        <Sidebar session={session}/>
        <div className="admin-container">
          header
          {children}
        </div>
      </main>
    </>
  );
}

export default Layout;
