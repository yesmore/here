"use client";

import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]/route";
import { Dispatch, SetStateAction, useState } from "react";

export default function HomeInput({}: {}) {
  const [input, setInput] = useState<string>("");

  return (
    <>
      <div className="">
        <input
          type="text"
          name="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="home-input"
          placeholder="Tell me about you..."
        />
        <Link
          href="/workspace"
          className="nice-border absolute right-36 top-1.5 border text-sm hover:border-gray-800"
        >
          👉
        </Link>
      </div>
    </>
  );
}
