import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import Image from "next/image";
import { auth } from "../../../../auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils";
import { eq } from "drizzle-orm";
import { User } from "next-auth";
import IDCardPreview from "@/components/IDCardPreview";
import BorrowBooksList from "@/components/BorrowBooksList";

async function MyProfile() {

  const session = await auth();
  if (!session || !session.user) return;

  const { image, email, name, id } = session.user as User;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id as string))
    .limit(1);

  return (
    <div className="flex gap-20 max-[950px]:flex-col max-[950px]:items-center">
      {/* PERSONAL INFO */}
      <div className="relative space-y-8 max-w-[550px] w-full h-max p-8 pt-25 bg-dark-300 rounded-2xl shadow-2xl">
        {/* LABLE */}
        <div className="absolute bg-dark-700 -top-5 left-[50%] translate-x-[-50%] w-15 h-22 rounded-b-full">
          <div className="absolute w-10 h-[10px] bottom-5 left-[50%] translate-x-[-50%] bg-dark-400 rounded-full" />
        </div>
        {/* PROFILE AND NAME*/}
        <div className="flex items-center gap-5 max-sm:flex-col max-sm:text-center max-sm:gap-2">
          <div className="relative w-25 h-25 max-lg:w-22 max-lg:h-22 border-dark-600/25 border-10 max-lg:border-8 rounded-full shadow-xl">
            {image ? (
              <Image src={image} alt="profile image" fill />
            ) : (
              <Avatar className="size-full">
                <AvatarFallback className="text-black bg-primary text-xl font-semibold">
                  {getInitials(session.user?.name || "IN")}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="space-y-1">
            <p></p>
            <h3 className="text-2xl max-lg:text-xl font-semibold">
              {name}
            </h3>
            <p className="text-light-100">{email}</p>
          </div>
        </div>
        {/* INFO */}
        <div>
          <p></p>
        </div>
        <div className="space-y-2">
          <p className="text-light-100 text-lg max-lg:text-base">Student ID</p>
          <h3 className="text-2xl max-lg:text-xl font-semibold">
            {user.universityId}
          </h3>
        </div>
        <div className="relative w-full h-70 max-[530px]:h-50 rounded-lg overflow-hidden">
          <IDCardPreview
            path={user.universityCard}
            username={user.fullName}
          />
        </div>
      </div>

      {/* BORROWED BOOKS LIST */}
      <div className="w-full">
        <BorrowBooksList userId={user.id} />
      </div>
    </div>
  );
}

export default MyProfile;
