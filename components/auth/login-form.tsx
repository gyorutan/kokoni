"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/auth/login", formData).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          router.push("/profile");
        } else {
          toast.error(response.data.message);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("에러가 발생했습니다");
    } finally {
      setFormData({ ...formData, email: "", password: "" });
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-[400px] border rounded-xl p-8 shadow-md flex flex-col gap-y-6"
    >
      <p className="text-2xl font-bold">로그인하기</p>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <Label>이메일</Label>
          <Input
            required
            value={formData.email}
            disabled={isLoading}
            type="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>비밀번호</Label>
          <Input
            required
            value={formData.password}
            disabled={isLoading}
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div>
          <Button disabled={isLoading} type="submit" className="w-full">
            로그인
          </Button>
        </div>
      </div>
      <div className="text-center">
        <Button asChild variant={"link"}>
          <Link href={"/auth/signup"}>계정 만들기</Link>
        </Button>
      </div>
    </form>
  );
};
