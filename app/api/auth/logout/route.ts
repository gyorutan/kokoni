import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  try {
    let response = NextResponse.next();

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
