import prisma from "./prisma";

interface Props {
  email: string;
  nickname: string;
}

export const addStory = async (props: Props) => {
  if (findStoryByEmail(props.email) === null) {
    await prisma.story.create({
      data: {
        email: props.email,
        tags: ["tag1", "tag2"],
        nickname: props.nickname,
        expires: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return "ok";
  }
  return "exist";
};

export const findStoryByEmail = async (email: string) => {
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
