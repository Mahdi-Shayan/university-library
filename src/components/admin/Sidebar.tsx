import { adminSideBarLinks } from "@/constants";
import Image from "next/image";
import Links from "./Links";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/utils";
import { Session } from "next-auth";

function Sidebar({ session }: { session: Session }) {
  return (
    <>
      <div className="admin-sidebar max-sm:px-1">
        <div>
          <div className="logo">
            <Image
              src="/icons/admin/logo.svg"
              alt="logo"
              height={37}
              width={37}
            />
            <h1>BookWise</h1>
          </div>
          <div className="mt-10 flex flex-col gap-5">
            {adminSideBarLinks.map((link) => (
              <Links link={link} key={link.route}/>
            ))}
          </div>
        </div>
        <div className="user">
          <Avatar className="w-[45px] h-[45px]">
            <AvatarFallback className="text-black font-semibold bg-primary">
              {getInitials(session.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col max-md:hidden">
            <p className="font-normal">{session.user?.name}</p>
            <p className="font-light text-light-500 text-xs">{session.user?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
