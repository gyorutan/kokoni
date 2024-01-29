"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UserInfo = () => {
  const router = useRouter();
  const logout = () => {
    try {
      axios.get("/api/auth/logout");
      toast.success("유저 로그아웃 성공");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("에러가 발생하였습니다");
    }
  };

  return (
    <div className="flex flex-col gap-y-4 justify-center items-center">
      <p className="text-2xl font-bold">유저 정보 페이지</p>
      <Button onClick={logout} variant={"destructive"} size={"lg"}>
        로그아웃
      </Button>
    </div>
  );
};
