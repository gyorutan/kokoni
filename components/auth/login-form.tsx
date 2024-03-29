"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
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
          router.push(DEFAULT_LOGIN_REDIRECT);
        } else {
          setError(response.data.message);
        }
      });
    } catch (error) {
      console.log(error);
      setError("에러가 발생했습니다");
    } finally {
      setFormData({ ...formData, email: "", password: "" });
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      headerLabel="환영합니다"
      backButtonLabel="계정 만들기"
      backButtonHref="/auth/signup"
      showSocial
    >
      <form onSubmit={handleLogin}>
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
              placeholder="mail@example.com"
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
              placeholder="******"
            />
          </div>
          <FormError message={error} />
          <Button
            variant={"blue"}
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            로그인
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
