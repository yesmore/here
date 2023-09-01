import { NextRequest, NextResponse } from "next/server";
import { addStory, getPublicStories } from "@/lib/db/story";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  try {
    const res = await getPublicStories(1, 10);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  const { email, metaInfo } = await req.json();

  console.log(metaInfo);

  if (!email) {
    return NextResponse.json("where is email?");
  }

  if (metaInfo.nickname && metaInfo.nickname.length <= 1) {
    return NextResponse.json("nickname is too short");
  }

  try {
    const res = await addStory({
      id: metaInfo.id,
      email: email,
      avatar: metaInfo.avatar,
      nickname: metaInfo.nickname,
      tags: metaInfo.tags,
      describtion: metaInfo.describtion,
      public: metaInfo.publicStory,
      meta_text_color: metaInfo.meta_text_color,
      meta_bg_color: metaInfo.meta_bg_color,
      meta_font_style: metaInfo.meta_font_style,
      meta_font_size: metaInfo.meta_font_size,
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}
