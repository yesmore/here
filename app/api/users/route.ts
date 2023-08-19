import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUsers } from "@/lib/db/user";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth/next";

export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string | string | undefined[]> },
) {
  const users = await getUsers();
  // const session = await getServerSession(authOptions);
  // console.log("用户", session);

  return NextResponse.json(users);
}
