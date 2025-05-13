"use client";

import { useAppSelector } from "@oms/store/hooks";
import LogoutButton from "./button/Logout.Button";
import { Role } from "@oms/types/user.type";

const Navbar = ({ role }: { role: Role }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 border-b">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">OMS</span>
        <span className="text-xs">{role}</span>
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <span className="mr-2">Welcome, {user?.firstName}</span>
            <LogoutButton />
          </>
        ) : (
          <a href="/auth/signin" className="px-4 py-2 bg-blue-600 text-white rounded">Sign In</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;