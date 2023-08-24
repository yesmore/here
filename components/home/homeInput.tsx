"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useStoryByEmail } from "@/pages/[nickname]/request";

export default function HomeInput({ session }: { session: Session | null }) {
  const route = useRouter();
  const { story, isLoading } = useStoryByEmail(session?.user?.email || "");
  const [input, setInput] = useState<string>("");

  const renderLinked = () => (
    <>
      <input
        type="text"
        placeholder={`meetu.dev/${story?.nickname}`}
        disabled={true}
        className="placeholder-cyan-500"
      />
      <button
        className="invite-btn"
        type="button"
        onClick={() => route.push(`/${input}`)}
      >
        Linked
      </button>
    </>
  );
  const renderUnLink = () => (
    <>
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
    </>
  );

  return (
    <>
      <div className="input-container mx-auto mt-6 animate-fade-up">
        {!isLoading && story?.nickname ? renderLinked() : renderUnLink()}
      </div>
    </>
  );
}
