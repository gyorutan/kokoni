import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  try {
    const response = NextResponse.json({
      success: true,
      message: "유저 로그아웃 성공",
    });

    response.cookies.set("token", "", { httpOnly: true });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "에러가 발생하였습니다",
    });
  }
};
