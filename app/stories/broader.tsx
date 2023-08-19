"use client";

import { useEffect, useState } from "react";

export default function StoryBrodar({
  value,
  onChange,
}: {
  value: any;
  onChange?: (val: string) => void;
}) {
  const [x, setX] = useState("");

  // useEffect(() => {
  //   console.log(x);
  //   onChange?.(x);
  // }, [x,]);

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setX(e.target.value)} />
        {x}
        {value.length}
      </div>
    </>
  );
}
