import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import NotFound from "@/components/layout/not-found";
import { getStoryByNickname } from "@/lib/db/story";
import { UserCard } from "./user-card";

export default async function UserHome({
  params,
}: {
  params: { nickname: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 mt-20 w-full max-w-xl p-3 xl:px-0">
        <UserCard session={session} nickname={params.nickname} />
      </div>
    </>
  );
}
