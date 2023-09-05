"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import NotFound from "@/components/layout/not-found";
import { useStoryByNickname } from "./request";
import toast, { Toaster } from "react-hot-toast";
import { UserLinkByName } from "@/components/user-link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MainView from "@/components/main/main-view";

export function UserCard({
  session,
  nickname,
}: {
  session: Session | null;
  nickname: string;
}) {
  const { story, isLoading, isError } = useStoryByNickname(nickname);

  useEffect(() => {
    // console.log("[useEffect]", story);
  }, [story]);

  if (["workspace", "story"].includes(nickname)) return <NotFound />;

  if (isLoading) {
    return (
      <>
        <div className="mt-12 ">
          <div className="flex flex-col items-center justify-center">
            <Skeleton circle width={50} height={50} />
            <Skeleton width={250} count={3} />
          </div>
        </div>
      </>
    );
  }

  if (!isLoading && !story) return <NotFound />;

  return (
    <div className={`relative mx-auto mt-12 w-full rounded-lg text-center`}>
      {story && <MainView metaInfo={story} />}
    </div>
  );
}
