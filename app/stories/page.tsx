import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import StoryList from "./storiesList";

export default async function Stories() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 w-full max-w-xl p-3 xl:px-0">
        <StoryList session={session} />
      </div>
    </>
  );
}
