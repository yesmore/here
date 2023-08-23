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
  const { nickname, email, type } = await req.json();

  console.log(nickname);

  if (type === "create") {
    try {
      const res = await addStory({ nickname: nickname, email: email });
      if (res === "ok") {
        return NextResponse.json("create success");
      } else if (res === "exist") {
        return NextResponse.json("story exist");
      }
    } catch (error) {
      return NextResponse.json(error);
    }
  } else if (type === "get-by-nickname") {
    if (!nickname) return NextResponse.json("empty nickname");
    try {
      const res = await getStoryByNickname(nickname);
      return NextResponse.json(res);
    } catch (error) {
      return NextResponse.json(error);
    }
  } else if (type === "get-by-email") {
    if (!email) return NextResponse.json("empty email");
    try {
      const res = await getStoryByEmail(email);
      return NextResponse.json(res);
    } catch (error) {
      return NextResponse.json(error);
    }
  }

  return NextResponse.json("Not found.");
}
