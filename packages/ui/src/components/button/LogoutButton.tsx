"use client";

import { clearUser } from "@oms/store/auth";
import { useAppDispatch } from "@oms/store/hooks";
import api from "@oms/utils/api";
import { toast } from "sonner";

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
    <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
      Logout
    </button>
  );
};

export default LogoutButton;
