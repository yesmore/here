import { NextRequest, NextResponse } from "next/server";
import { addStory, getPublicStories } from "@/lib/db/story";
import { isAllAlphabetic } from "@/lib/utils";

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
  const { metaInfo } = await req.json();

  console.log(metaInfo);

  if (!metaInfo.email) {
    return NextResponse.json("Where is email?");
  }

  if (
    metaInfo.nickname &&
    (metaInfo.nickname.length <= 1 || metaInfo.nickname.length >= 60)
  ) {
    return NextResponse.json("Invalid nickname");
  }
  if (!isAllAlphabetic(metaInfo.nickname)) {
    return NextResponse.json("Invalid nickname");
  }

  try {
    const res = await addStory({
      id: metaInfo.id,
      email: metaInfo.email,
      avatar: metaInfo.avatar,
      nickname: metaInfo.nickname,
      tags: metaInfo.tags,
      describtion: metaInfo.describtion,
      public: metaInfo.public,
      meta_text_color: metaInfo.meta_text_color,
      meta_bg_color: metaInfo.meta_bg_color,
      meta_font_style: metaInfo.meta_font_style,
      meta_font_size: metaInfo.meta_font_size,
      meta_font_weight: metaInfo.meta_font_weight,
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(error);
  }
}
