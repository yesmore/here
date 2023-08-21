"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";

export default function InputArea({ session }: { session: Session | null }) {
  const [key, setKey] = useState<string>("");
  const [story, setStory] = useState<[any]>();

  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    const res = await fetch("/api/story", { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      setStory(data.data);
      // console.log(data);
    }
  };

  const createStory = () => {
    // fetch(`/api/story`, {
    //   method: "POST",
    //   body: JSON.stringify({ key, email: "songsonghhhh@gmail.com" }),
    // });
    if (session?.user) {
      fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({ key, email: session.user.email }),
      });
      getStories();
    }
  };

  function handleChangeValue(val: string) {
    setKey(val);
  }

  return (
    <>
      <input type="text" onChange={(e) => handleChangeValue(e.target.value)} />
      <button className="nice-border" onClick={createStory}>
        创建一个
      </button>
      <p>{story && story.length} Stories</p>
    </>
  );
}
