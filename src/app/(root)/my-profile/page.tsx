import { Button } from "@/components/ui/button";
import { signOut } from "../../../../auth";
import { LogOut } from "lucide-react";
import HomeBookList from "@/components/HomeBookList";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import { SampleBooks } from "../../../../types";

async function MyProfile() {
  const booksList = (await db.select().from(books)) as SampleBooks[];

  return (
    <>
      <form
        className="mb-20"
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button className="bg-red-700 hover:bg-red-700/82">
          <LogOut />
          Logout
        </Button>
      </form>

      <HomeBookList title="Borrowed Books" books={booksList} />
    </>
  );
}

export default MyProfile;
