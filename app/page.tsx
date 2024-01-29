import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 h-full flex flex-col gap-y-8 justify-center items-center">
      <p className="text-2xl font-bold flex gap-x-2">
        <Image src={"/logo.png"} alt="logo" width={35} height={35} />
        <span>kokoni</span>
      </p>
      <div className="w-[200px] flex flex-col gap-y-4">
        <Button asChild className="w-full" variant={"blue"}>
          <Link href={"/auth/login"}>로그인</Link>
        </Button>
      </div>
    </div>
  );
}
