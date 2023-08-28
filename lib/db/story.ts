import prisma from "./prisma";

export interface CreateStoryProps {
  email: string;
  avatar: string;
  nickname: string;
  tags: string[];
  describtion: string;
  public: boolean;
  meta_text_color: string;
  meta_bg_color: string;
  meta_font_style: string;
  meta_font_size: string;
}

export const getPublicStories = async (
  pageNum: number,
  pageSize: number = 10,
) => {
  if (pageNum && pageSize) {
    return await prisma.story.findMany({
      where: {
        public: true,
      },
    });
  }
};

export const addStory = async (props: CreateStoryProps) => {
  const findStodyByNickname = await getStoryByNickname(props.nickname);
  const findStoryByEmail = await getStoryByEmail(props.email);
  console.log("[findStory]", findStodyByNickname, findStoryByEmail);

  if (findStodyByNickname) {
    return "oops! this nickname already exists";
  }
  if (findStoryByEmail) {
    return "you have already created a link";
  }

  if (findStodyByNickname === null && findStoryByEmail === null) {
    await prisma.story.create({
      data: {
        email: props.email,
        tags: props.tags,
        nickname: props.nickname,
        public: props.public,
        describtion: props.describtion,
        meta_bg_color: props.meta_bg_color,
        meta_text_color: props.meta_text_color,
        meta_font_size: props.meta_font_size,
        meta_font_style: props.meta_font_style,
        expires: new Date(
          new Date().getFullYear() + 1,
          new Date().getMonth(),
          new Date().getDate(),
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return "ok";
  }
  return "something went wrong";
};

export const getStoryByEmail = async (email: string) => {
  const res = await prisma.story.findFirst({
    where: {
      email: email,
    },
  });
  console.log("查询结果", res);

  if (res) {
    return res;
  }
  return null;
};

export const getStoryByNickname = async (nickname: string) => {
  const res = await prisma.story.findFirst({
    where: {
      nickname: nickname,
    },
  });
  console.log("查询结果", res);

  if (res) {
    return res;
  }
  return null;
};
