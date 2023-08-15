import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
    take: 1,
  });

  return [
    {
      url: "https://oh.aging.run",
      lastModified: new Date(),
    },
    ...users.map((user) => ({
      url: `https://oh.aging.run/${user.id}`,
      lastModified: new Date(),
    })),
  ];
}
