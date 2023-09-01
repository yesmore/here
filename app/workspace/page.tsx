import { getServerSession } from "next-auth/next";
import NotFound from "@/components/layout/not-found";
import { getStoryByNickname } from "@/lib/db/story";
import { authOptions } from "@/pages/api/auth/[...nextauth]/route";
import Worker from "./worker";
import { Toaster } from "react-hot-toast";

export default async function WorkspaceItem({}: {}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="dot-bg relative z-10 w-full overflow-x-hidden ">
        <Worker session={session} />
      </div>
      <Toaster />
    </>
  );
}
