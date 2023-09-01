"use client";

import { KeyboardEventHandler, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useStoryByEmail } from "@/pages/[nickname]/request";
import Link from "next/link";
import LoadingDots from "../shared/icons/loading-dots";

export default function HomeInput({ session }: { session: Session | null }) {
  const route = useRouter();
  const { story, isLoading } = useStoryByEmail(session?.user?.email || "");
  const [input, setInput] = useState<string>("");
  const [joinClicked, setJoinClicked] = useState(false);

  const handleEnter = (key: string) => {
    if (key === "Enter" && input !== "") {
      goToWorkSpace();
    }
  };
  const goToWorkSpace = () => {
    setJoinClicked(true);
    route.push(`/workspace?n=${input}`);
    setTimeout(() => {
      setJoinClicked(false);
    }, 10000);
  };

  // 已注册
  const renderLinked = () => (
    <>
      <input
        type="text"
        disabled={true}
        value={`${story?.nickname}`}
        className="cursor-pointer text-cyan-600"
      />
      <span className="absolute left-3 top-2.5 font-semibold text-cyan-500">
        meetu.dev/
      </span>
      <Link
        className="invite-btn"
        type="button"
        href={`/${story?.nickname}`}
        target="_blank"
      >
        Linked
      </Link>
    </>
  );
  const renderUnLink = () => (
    <>
      <input
        placeholder={"nickname"}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text text-cyan-600 placeholder-gray-400"
        onKeyDown={(e) => handleEnter(e.key)}
      />
      <span className="text absolute left-3 top-2.5 font-semibold text-cyan-500">
        meetu.dev/
      </span>

      <button
        className="invite-btn"
        type="button"
        onClick={() => goToWorkSpace()}
        disabled={joinClicked}
      >
        {joinClicked ? <LoadingDots color="#efefef" /> : <>Join</>}
      </button>
    </>
  );

  return (
    <>
      <div className="input-container mx-auto mt-6 animate-fade-up">
        {/* {renderLinked()} */}
        {!isLoading && story?.nickname ? renderLinked() : renderUnLink()}
      </div>
    </>
  );
}
