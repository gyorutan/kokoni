import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  return NextResponse.json({ message: "POST에 대한 RESPONSE" });
}
