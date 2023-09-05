import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { UserCard } from "./user-card";
import UserFooter from "@/components/layout/user-footer";

export default async function UserHome({
  params,
}: {
  params: { nickname: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="relative z-10 w-full overflow-x-hidden">
        <UserCard session={session} nickname={params.nickname} />
      </div>
    </>
  );
}
