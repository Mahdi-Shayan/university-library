import { Session } from "next-auth";

function Header({ session }: { session: Session }) {
  return (
    <>
      <header className="admin-header">
        <div>
          <h2 className="text-2xl font-semibold text-dark-400">
            Welcome, {session?.user?.name}
          </h2>
          <p className="text-light-500 font-light mt-1 max-md:text-sm">Monitor all of your projects and tasks here</p>
        </div>

        <p>search</p>
      </header>
    </>
  );
}

export default Header;
