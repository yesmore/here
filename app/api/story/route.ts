import { NextRequest, NextResponse } from "next/server";
import { addStory } from "@/lib/db/story";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth/next";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  // const users = await addStory();
  // const session = await getServerSession(authOptions);
  // console.log("用户", session);
  return NextResponse.json({ msg: "hi" });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  const res = await addStory();
  console.log("创建结果", res);
}
