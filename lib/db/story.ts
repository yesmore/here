import prisma from "./prisma";

export interface CreateStoryProps {
  email: string;
  nickname: string;
  tags: string[];
  describtion: string;
  public: boolean;
}

export const getStories = async (pageNum: number, pageSize: number = 10) => {
  if (pageNum && pageSize) {
    return await prisma.story.findMany();
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
        tags: ["tag1", "tag2"],
        nickname: props.nickname,
        public: true,
        describtion: "",
        expires: new Date(),
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
