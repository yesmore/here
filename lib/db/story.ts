import prisma from "./prisma";

export interface CreateStoryProps {
  email: string;
  nickname: string;
  tags: string[];
  describtion: string;
  public: boolean;
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
        meta_bg_color: "0",
        meta_text_color: "0",
        meta_font_size: "0",
        meta_font_style: "0",
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
