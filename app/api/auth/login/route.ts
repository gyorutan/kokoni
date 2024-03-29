import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export interface Payload {
  id: string;
}

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { email, password } = body;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: "이메일 또는 비밀번호가 일치하지 않습니다",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: "이메일 또는 비밀번호가 일치하지 않습니다",
      });
    }

    const jwtPayload: Payload = {
      id: existingUser.id,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      success: true,
      message: "로그인되었습니다",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "에러가 발생하였습니다",
    });
  }
};
