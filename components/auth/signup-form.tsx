"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";

export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post("/api/auth/signup", formData).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("에러가 발생했습니다");
    } finally {
      setFormData({ ...formData, name: "", email: "", password: "" });
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-[400px] border rounded-xl p-8 shadow-md flex flex-col gap-y-6"
    >
      <p className="text-2xl font-bold">계정 만들기</p>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <Label>이름</Label>
          <Input
            required
            value={formData.name}
            disabled={isLoading}
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
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
            가입
          </Button>
        </div>
      </div>
      <div className="text-center">
        <Button asChild variant={"link"}>
          <Link href={"/auth/login"}>로그인하기</Link>
        </Button>
      </div>
    </form>
  );
};
