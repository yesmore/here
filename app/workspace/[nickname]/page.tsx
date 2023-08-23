import { getServerSession } from "next-auth/next";
import NotFound from "@/components/layout/not-found";
import { getStoryByNickname } from "@/lib/db/story";
import { authOptions } from "@/pages/api/auth/[...nextauth]/route";

export default async function WorkspaceItem({
  params,
}: {
  params: { nickname: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 mt-20 w-full max-w-xl p-3 xl:px-0">
        {params.nickname}
      </div>
    </>
  );
}
