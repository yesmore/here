import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import StoryList from "./stories-list";

export default async function Stories() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 mt-20 w-full p-3 xl:px-0">
        <StoryList session={session} />
      </div>
    </>
  );
}
