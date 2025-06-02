"use client";

import { clearUser } from "@oms/store/auth";
import { useAppDispatch } from "@oms/store/hooks";
import api from "@oms/utils/api";
import { toast } from "sonner";
import Image from "next/image";
import logOut from "../../assets/icons/random/log-out.svg";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // Must match your backend route
      dispatch(clearUser());
      toast.success("Logged out successfully");
    } catch (error: unknown) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 rounded text-white">
      <span className="max-sm:hidden">Logout</span>
      <Image src={logOut} alt="logout" className="sm:hidden" width={16} height={16} />
    </button>
  );
};

export default LogoutButton;
