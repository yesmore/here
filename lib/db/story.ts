import prisma from "./prisma";

interface Props {
  email: string;
  nickname: string;
}

export const addStory = async (props: Props) => {
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
};
