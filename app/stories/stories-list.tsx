"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Card from "@/components/shared/card";
import ComponentGrid from "@/components/home/component-grid";
import { UserStory } from "@/lib/types/story";
import toast, { Toaster } from "react-hot-toast";
import { useStories } from "./request";

export default function StoryList({ session }: { session: Session | null }) {
  // useEffect(() => {})
  const { stories, isLoading, isError } = useStories();

  // const renderList = () => {
  //   return (
  //     <>
  //       {isLoading && stories ? (
  //         <p>loading</p>
  //       ) : (
  //         <div
  //           onClick={() => toast("Hello World")}
  //           className="grid auto-cols-max grid-cols-1 gap-4 md:grid-cols-2"
  //         >
  //           {stories?.map((item) => {
  //             return <StoryItem session={session} story={item} key={item.id} />;
  //           })}

  //           <Toaster />
  //         </div>
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      <div className="story-list">
        {isLoading ? (
          <p>loading</p>
        ) : (
          <div
            onClick={() => toast("Hello World")}
            className="grid auto-cols-max grid-cols-1 gap-4 md:grid-cols-2"
          >
            {stories &&
              stories.map((item) => {
                return (
                  <StoryItem session={session} story={item} key={item.id} />
                );
              })}

            <Toaster />
          </div>
        )}
      </div>
    </>
  );
}

export function StoryItem({
  session,
  story,
}: {
  session: Session | null;
  story: UserStory;
}) {
  // const [x, setX] = useState("");

  return (
    <div
      className={`relative h-full w-full rounded-lg border border-gray-200 p-2 `}
    >
      <div className="">
        <h2 className="">{story.nickname}</h2>
        <div className="">
          <ReactMarkdown>{story.describtion}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
