import { Button } from "@/components/ui/button";
import { signOut } from "../../../../auth";
import { LogOut } from "lucide-react";
import HomeBookList from "@/components/HomeBookList";
import { sampleBooks } from "@/constants";

function MyProfile() {
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

      <HomeBookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
}

export default MyProfile;
