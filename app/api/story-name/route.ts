import { NextRequest, NextResponse } from "next/server";
import { getStories, getStoryByNickname } from "@/lib/db/story";
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

export async function POST(req: NextRequest) {
  const { nickname } = await req.json();

  console.log(nickname);

  if (!nickname) return NextResponse.json("empty nickname");
  try {
    const res = await getStoryByNickname(nickname);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}
