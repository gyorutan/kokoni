"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error";

export const SignupForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("비밀번호는 6자 이상입니다");
      return
    }
    try {
      setIsLoading(true);
      await axios.post("/api/auth/signup", formData).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          router.push("/auth/login");
        } else {
          setError(response.data.message);
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
    <CardWrapper
      headerLabel="새로운 계정 만들기"
      backButtonLabel="이미 계정이 있어요"
      backButtonHref="/auth/login"
      showSocial
    >
      <form onSubmit={handleSignup}>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>이름</Label>
            <Input
              required
              value={formData.name}
              disabled={isLoading}
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="이름을 입력해주세요"
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
            가입
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
