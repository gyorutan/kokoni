import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 h-full flex flex-col gap-y-8 justify-center items-center">
      <p className="text-2xl font-bold">JWT 인증 토큰 연습</p>
      <div className="w-[200px] flex flex-col gap-y-4">
        <Button asChild className="w-full">
          <Link href={"/auth/login"}>로그인</Link>
        </Button>
        <Button asChild variant={"outline"} className="w-full">
          <Link href={"/auth/signup"}>가입</Link>
        </Button>
      </div>
    </div>
  );
}
