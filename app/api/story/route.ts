import { NextRequest, NextResponse } from "next/server";
import {
  addStory,
  getStories,
  getStoryByEmail,
  getStoryByNickname,
} from "@/lib/db/story";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth/next";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const res = await getStories(1, 10);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  const {
    nickname,
    email,
    tags,
    describtion,
    public: publicStory,
  } = await req.json();

  console.log(nickname);

  try {
    const res = await addStory({
      nickname: nickname,
      email: email,
      tags,
      describtion,
      public: publicStory,
    });
    if (res === "ok") {
      return NextResponse.json("create success");
    } else {
      return NextResponse.json(res);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
