"use client";

import { UserButton } from "@/components/auth/user-button";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav
      className="
    bg-white
    z-50
    fixed
    top-0
    bg-secondary
    flex 
    justify-between 
    items-center 
    p-3 
    md:rounded-xl
    w-full
    max-w-[768px] 
    min-w-[330px]
    shadow-sm"
    >
      <div className="">
        <Link href={"/main"} className="flex gap-x-2 items-center">
          <Image src={"/logo.png"} alt="logo" width={35} height={35} />
          <span className="text-lg font-semibold">kokoni</span>
        </Link>
      </div>
      <UserButton />
    </nav>
  );
};
