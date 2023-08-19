import prisma from "./prisma";

// get all users from user schema
export const getUsers = async () => {
  return await prisma.user.findMany();
};
