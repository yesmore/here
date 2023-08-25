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
  const { stories, isLoading } = useStories();

  if (isLoading) {
    return (
      <>
        <div className="mx-6 grid auto-cols-max grid-cols-1 gap-4  sm:grid-cols-2 md:mx-10 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return (
              <div
                key={item}
                className="w-full rounded-md border border-gray-200 p-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton circle width={50} height={50} />
                  <Skeleton height={40} />
                </div>

                <Skeleton height={20} />
                <Skeleton count={2} />
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="story-list mx-6 md:mx-10">
        {/* <div className="grid auto-cols-max grid-flow-row auto-rows-min grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 "> */}
        <div className="flex flex-wrap items-start justify-start gap-4">
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
      className={`story-item relative h-full grow cursor-pointer rounded-lg p-2 shadow transition-all duration-300`}
      onClick={() => router.push(`/${story.nickname}`)}
    >
      <div className="">
        <h2 className="truncate">{story.nickname}</h2>
        {story.describtion && <p className="break-all">{story.describtion}</p>}
      </div>
    </div>
  );
}
