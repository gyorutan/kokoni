import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "토큰이 없습니다",
      });
    }
    const response = NextResponse.json({
      success: true,
      message: "유저 로그아웃 성공",
    });

    response.cookies.delete("token");

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "에러가 발생하였습니다",
    });
  }
};
