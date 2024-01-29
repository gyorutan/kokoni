"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LogoutButtonProps {
  children: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/auth/logout").then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          router.push("/auth/login");
        } else {
          toast.success("로그아웃 실패");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("에러가 발생하였습니다");
    }
  };

  return (
    <span onClick={logout} className="cursor-pointer">
      {children}
    </span>
  );
};
