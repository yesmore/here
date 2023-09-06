import { UserStory } from "../types/story";
import prisma from "./prisma";

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

export const addStory = async (props: UserStory) => {
  const findStodyByNickname = await getStoryByNickname(props.nickname);
  const findStoryByEmail = await getStoryByEmail(props.email);
  console.log("[findStory]", findStodyByNickname, findStoryByEmail);

  // 更新：已注册且已经成过Link
  if (findStoryByEmail) {
    console.log("更新story", props.nickname);

    await prisma.story.update({
      where: {
        id: props.id,
      },
      data: {
        tags: props.tags,
        nickname: props.nickname,
        avatar: props.avatar,
        public: props.public,
        describtion: props.describtion,
        view: props.view,
        meta_bg_color: props.meta_bg_color,
        meta_text_color: props.meta_text_color,
        meta_font_size: props.meta_font_size,
        meta_font_style: props.meta_font_style,
        meta_font_weight: props.meta_font_weight,
        meta_layout: props.meta_layout,
        meta_rounded: props.meta_rounded,
      },
    });
    return "Updated";
  }

  // 已注册但未生成过Link
  if (findStodyByNickname) {
    return "oops! this nickname already exists";
  }
  if (findStodyByNickname === null && findStoryByEmail === null) {
    await prisma.story.create({
      data: {
        email: props.email,
        avatar: props.avatar,
        tags: props.tags,
        nickname: props.nickname,
        public: props.public,
        describtion: props.describtion,
        view: props.view,
        meta_bg_color: props.meta_bg_color,
        meta_text_color: props.meta_text_color,
        meta_font_size: props.meta_font_size,
        meta_font_style: props.meta_font_style,
        meta_layout: props.meta_layout,
        meta_rounded: props.meta_rounded,
        expires: new Date(
          new Date().getFullYear() + 1,
          new Date().getMonth(),
          new Date().getDate(),
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return "Created";
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

  if (res) {
    // const currentTime = new Date().getTime();
    // const lastUpdatedTime = res.updatedAt.getTime();
    // if (currentTime - lastUpdatedTime >= 60000) {

    // }
    await prisma.story.update({
      where: { id: res.id },
      data: {
        view: res.view + 1,
      },
    });
    return res;
  }
  return null;
};

export const updateStoryView = async (id: string) => {
  const record = await prisma.story.findUnique({
    where: { id },
  });
  if (record) {
    const updatedValue = record.view + 1;

    await prisma.story.update({
      where: { id },
      data: {
        view: updatedValue,
      },
    });
    return updatedValue;
  } else {
    return "Not found";
  }
};
