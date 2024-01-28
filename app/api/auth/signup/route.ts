import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, password } = body;

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "이미 존재하는 이메일입니다",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log({ createdUser });

    return NextResponse.json({
      success: true,
      message: "유저가 생성되었습니다",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "에러가 발생하였습니다",
    });
  }
};
