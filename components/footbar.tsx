"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className="
      bg-white
      z-50
      fixed
      bottom-0
      bg-secondary
      flex
      items-center 
      p-3 
      md:rounded-xl
      w-full
      max-w-[768px] 
      min-w-[330px]
      shadow-sm"
    >
      <div className="flex gap-x-2 justify-between w-full">
        <Button
          className="w-full"
          asChild
          variant={pathname === "/main" ? "blue" : "outline"}
        >
          <Link href={"/main"}>메인</Link>
        </Button>
        <Button
          className="w-full"
          asChild
          variant={pathname === "/post/create" ? "blue" : "outline"}
        >
          <Link href={"/post/create"}>글쓰기</Link>
        </Button>
        <Button
          className="w-full"
          asChild
          variant={pathname === "/notification" ? "blue" : "outline"}
        >
          <Link href={"/notification"}>알림</Link>
        </Button>
        <Button
          className="w-full"
          asChild
          variant={pathname === "/settings" ? "blue" : "outline"}
        >
          <Link href={"/settings"}>설정</Link>
        </Button>
      </div>
    </nav>
  );
};
