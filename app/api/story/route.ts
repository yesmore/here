import { NextRequest, NextResponse } from "next/server";
import { addStory, getStories } from "@/lib/db/story";
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
  const { key, email } = await req.json();

  console.log(key);

  try {
    const res = await addStory({ nickname: key, email: email });
    if (res === "ok") {
      return NextResponse.json("create success");
    } else if (res === "exist") {
      return NextResponse.json("story exist");
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
