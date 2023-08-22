"use client";

import { fetcher } from "@/lib/utils";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import Card from "@/components/shared/card";
import ComponentGrid from "@/components/home/component-grid";
import { UserStory } from "@/lib/types/story";

function useStories() {
  let api = `/api/story`;
  const { data, error, isLoading } = useSWR<[UserStory]>(api, () =>
    fetcher(api, { method: "GET" }),
  );

  return {
    stories: data,
    isLoading,
    isError: error,
  };
}

export default function StoryList({ session }: { session: Session | null }) {
  const { stories, isLoading, isError } = useStories();

  const renderList = () => {
    return (
      <div className="grid auto-cols-max grid-cols-1 gap-4 md:grid-cols-2">
        {stories?.map((item) => {
          return <StoryItem session={session} story={item} key={item.id} />;
        })}
        {stories?.map((item) => {
          return <StoryItem session={session} story={item} key={item.id} />;
        })}
        {stories?.map((item) => {
          return <StoryItem session={session} story={item} key={item.id} />;
        })}
      </div>
    );
  };

  return (
    <>
      <div className="story-list">
        {isLoading ? <p>loading</p> : renderList()}
      </div>
    </>
  );
}

export function StoryItem({
  session,
  story,
  onChange,
}: {
  session: Session | null;
  story: UserStory;
  onChange?: (val: string) => void;
}) {
  const [x, setX] = useState("");

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md`}
    >
      {/* <div className="flex h-60 items-center justify-center">{demo}</div> */}
      <div className="mx-auto max-w-md text-center">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          {story.nickname}
        </h2>
        <div className="prose-sm -mt-2 leading-normal text-gray-500 md:prose">
          <ReactMarkdown>{story.describtion}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
