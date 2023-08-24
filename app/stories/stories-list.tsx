"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "@/components/shared/card";
import ComponentGrid from "@/components/home/component-grid";
import { UserStory } from "@/lib/types/story";
import toast, { Toaster } from "react-hot-toast";
import { useStories } from "./request";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";

export default function StoryList({ session }: { session: Session | null }) {
  // useEffect(() => {})
  const { stories, isLoading, isError } = useStories();

  if (isLoading) {
    return (
      <>
        <div className="grid auto-cols-max grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <div key={item} className="rounded-md border border-gray-200 p-3">
                <div className="flex items-center gap-3">
                  <Skeleton circle width={50} height={50} />
                  <Skeleton width={140} height={40} />
                </div>

                <Skeleton count={3} />
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="story-list">
        <div className="grid auto-cols-max grid-cols-1 gap-4 md:grid-cols-2">
          {stories?.map((item) => {
            return (
              <StoryItem
                session={session}
                story={item}
                isLoading={isLoading}
                key={item.id}
              />
            );
          })}

          <Toaster />
        </div>
      </div>
    </>
  );
}

export function StoryItem({
  session,
  story,
  isLoading,
}: {
  session: Session | null;
  story: UserStory;
  isLoading: Boolean;
}) {
  // const [x, setX] = useState("");
  const router = useRouter();

  return (
    <div
      className={`story-item relative h-full w-full cursor-pointer rounded-lg border border-gray-200 p-2 transition-all`}
      onClick={() => router.push(`/${story.nickname}`)}
    >
      <div className="">
        <h2 className="">{story.nickname}</h2>
        <div className="">{story.describtion}</div>
      </div>
    </div>
  );
}
