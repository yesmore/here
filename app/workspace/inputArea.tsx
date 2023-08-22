"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export default function InputArea({ session }: { session: Session | null }) {
  const [key, setKey] = useState<string>("");

  const createStory = () => {
    if (session?.user) {
      fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({ key, email: session.user.email }),
      });
    }
  };

  function handleChangeValue(val: string) {
    setKey(val);
  }

  return (
    <div>
      <input type="text" onChange={(e) => handleChangeValue(e.target.value)} />
      <button className="nice-border" onClick={createStory}>
        创建一个
      </button>
    </div>
  );
}
