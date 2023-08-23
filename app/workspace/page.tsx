import InputArea from "./inputArea";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function Workspace() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 mt-20 w-full px-5 xl:px-0">
        <InputArea session={session} />
      </div>
    </>
  );
}
