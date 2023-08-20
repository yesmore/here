"use client";

import { useState } from "react";
import { Session } from "next-auth";

export default function InputArea({ session }: { session: Session | null }) {
  const [key, setKey] = useState<string>("");

  function createStory() {
    if (session?.user) {
      fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({ key, email: session.user.email }),
      });
    }
  }

  function handleChangeValue(val: string) {
    setKey(val);
  }

  return (
    <>
      <input type="text" onChange={(e) => handleChangeValue(e.target.value)} />
      <button className="nice-border" onClick={createStory}>
        创建一个
      </button>
    </>
  );
}
