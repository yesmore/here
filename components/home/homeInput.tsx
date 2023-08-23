"use client";

import Link from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth]/route";
import { Dispatch, SetStateAction, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useStoryByEmail } from "@/pages/[nickname]/request";

export default function HomeInput({ session }: { session: Session | null }) {
  const route = useRouter();
  const { story, isLoading } = useStoryByEmail(session?.user?.email || "");

  const [input, setInput] = useState<string>("");

  if (!isLoading && story?.nickname) {
    return (
      <>
        <div className="nice-border mx-auto mt-6 w-24 text-center">
          <Link
            href={`/${story.nickname}`}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
          >
            Link me
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="input-container mx-auto mt-6 animate-fade-up">
        <input
          placeholder={"Call me by your name..."}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="invite-btn"
          type="button"
          onClick={() => route.push(`/workspace/${input}`)}
        >
          Join
        </button>
      </div>
    </>
  );
}
