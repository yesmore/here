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
  const { key, email } = await req.json();

  console.log(key);

  try {
    await addStory({ nickname: key, email: email });
  } catch (error) {
    return NextResponse.json({ msg: error });
  }

  return NextResponse.json({ msg: "create success" });
}
