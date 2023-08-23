"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import NotFound from "@/components/layout/not-found";
import { useStoryByNickname } from "./request";
import toast, { Toaster } from "react-hot-toast";

export function UserCard({
  session,
  nickname,
}: {
  session: Session | null;
  nickname: string;
}) {
  const { story, isLoading, isError } = useStoryByNickname(nickname);

  useEffect(() => {
    console.log("[useEffect]", story);
  }, [story]);

  if (["workspace", "story"].includes(nickname)) return <NotFound />;

  if (!isLoading && !story) return <NotFound />;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-gray-200 `}
    >
      {isLoading ? (
        <p>loading</p>
      ) : (
        <div className="mx-auto max-w-md text-center">
          <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
            {story?.nickname}
          </h2>
          <div className="prose-sm -mt-2 leading-normal text-gray-500 md:prose">
            <ReactMarkdown>{story?.describtion ?? ""}</ReactMarkdown>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}
