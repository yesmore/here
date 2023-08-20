import prisma from "./prisma";

export const addStory = async () => {
  const newStory = await prisma.story.create({
    data: {
      userId: "cllbsd09o0000md08qpeo",
      tags: ["tag1", "tag2"],
      nickname: "this",
      expires: new Date(),
      updateAt: new Date(),
    },
  });
};
