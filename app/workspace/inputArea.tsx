"use client";

import { useState } from "react";

export default function InputArea() {
  const [link, setLink] = useState<string>("");

  function createStory() {
    fetch("/api/story", { method: "POST" });
  }

  return (
    <>
      <button className="nice-border" onClick={createStory}>
        创建一个
      </button>
    </>
  );
}
