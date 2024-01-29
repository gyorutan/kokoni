"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

export const UserInfo = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    const getUserProfile = async () => {
      await axios.get("/api/users/profile").then((response) => {
        setUser(response.data.user);
      });
    };
    getUserProfile();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 justify-center items-center">
      <p className="text-2xl font-bold">유저 정보 페이지</p>
      {user && (
        <>
          <p>{user?.name}님</p>
          <p>{user?.id}</p>
          <p>{user?.email}</p>
        </>
      )}
      <Button onClick={logout} variant={"destructive"} size={"lg"}>
        로그아웃
      </Button>
    </div>
  );
};
