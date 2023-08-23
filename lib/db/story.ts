import prisma from "./prisma";

interface Props {
  email: string;
  nickname: string;
}

export const getStories = async (pageNum: number, pageSize: number = 10) => {
  if (pageNum && pageSize) {
    return await prisma.story.findMany();
  }
};

export const addStory = async (props: Props) => {
  const findStory = await getStoryByEmail(props.email);
  console.log("[findStory]", findStory);

  if (findStory === null) {
    await prisma.story.create({
      data: {
        email: props.email,
        tags: ["tag1", "tag2"],
        nickname: props.nickname,
        describtion: "",
        expires: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return "ok";
  }
  return "exist";
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
