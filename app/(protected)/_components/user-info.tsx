"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UserInfo = () => {
  const router = useRouter();
  const onClick = async () => {
    await axios.get("/api/auth/logout").then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    });
  };

  return (
    <div className="flex flex-col gap-y-4 justify-center items-center">
      <p className="text-2xl font-bold">유저 정보 페이지</p>
      <Button onClick={onClick} variant={"destructive"} size={"lg"}>
        로그아웃
      </Button>
    </div>
  );
};
