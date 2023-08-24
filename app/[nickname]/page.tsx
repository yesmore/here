import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { UserCard } from "./user-card";
import UserFooter from "./user-footer";

export default async function UserHome({
  params,
}: {
  params: { nickname: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="relative z-10 h-screen w-full max-w-xl p-3 xl:px-0">
        <UserCard session={session} nickname={params.nickname} />
        <UserFooter />
      </div>
    </>
  );
}
