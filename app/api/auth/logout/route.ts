import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  try {
    let response = NextResponse.json({
      success: true,
      message: "로그아웃되었습니다",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
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
