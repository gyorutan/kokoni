import { verifyToken } from "@/helper/verify-token";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "잘못된 접근입니다" });
  }

  const user = await verifyToken(token);

  return NextResponse.json({ user });
};
