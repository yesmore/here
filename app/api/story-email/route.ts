import { NextRequest, NextResponse } from "next/server";
import { getStoryByEmail } from "@/lib/db/story";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  console.log("[email]", email);

  if (!email) return NextResponse.json("empty email");

  try {
    const res = await getStoryByEmail(email);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}
