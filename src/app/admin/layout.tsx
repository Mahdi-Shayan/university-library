import { ReactNode } from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) redirect("sign-in");

  const res: { isAdmin: "USER" | "ADMIN" | null }[] = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  const isAdmin: boolean = res[0].isAdmin === "ADMIN";

  if (!isAdmin) redirect("/");

  return (
    <>
      <main className="flex min-h-screen w-full">
        <Sidebar session={session} />
        <div className="admin-container">
          <Header session={session} />
          {children}
        </div>
      </main>
    </>
  );
}

export default Layout;
