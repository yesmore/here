"use client";

import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]/route";
import { Dispatch, SetStateAction, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function HomeInput({ session }: { session: Session | null }) {
  const route = useRouter();
  const [input, setInput] = useState<string>("");

  return (
    <div className="input-container mx-auto mt-6 animate-fade-up">
      <input
        placeholder={
          session?.user
            ? `${session?.user.name}, tell`
            : "Tell" + " me about you..."
        }
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="invite-btn"
        type="button"
        onClick={() => route.push(`/workspace?words=${input}`)}
      >
        Join
      </button>
    </div>
  );
}
