"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { CreateStoryProps } from "@/lib/db/story";
import "@/styles/toggle.css";
import toast from "react-hot-toast";
import { useSignInModal } from "@/components/layout/sign-in-modal";

export default function InputArea({
  session,
  nickname,
}: {
  session: Session | null;
  nickname: string;
}) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  const [name, setNickname] = useState<string>(nickname);
  const [tags, setTags] = useState<string[]>([]);
  const [describtion, setDescribtion] = useState<string>("");
  const [publicStory, setPublic] = useState<boolean>(true);

  // useEffect(() => {
  //   setNickname(nickname);
  // }, [nickname]);

  const handleCreateStory = () => {
    if (session?.user) {
      fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({
          nickname: name,
          email: session.user.email,
          tags: tags,
          describtion: describtion,
          public: publicStory,
        } as CreateStoryProps),
      });
    } else {
      setShowSignInModal(true);
      toast("Please sign in first");
    }
  };

  return (
    <div>
      <SignInModal />
      <input
        type="text"
        value={name}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input type="text" onChange={(e) => setDescribtion(e.target.value)} />

      {/* <div className="checkbox-wrapper-41">
        <input
          type="checkbox"
          checked={publicStory}
          onClick={() => setPublic(!publicStory)}
        />
      </div> */}
      <div className="checkbox-wrapper-5">
        <div className="check" onClick={() => setPublic(!publicStory)}>
          <input onChange={() => null} checked={publicStory} type="checkbox" />
          <label></label>
        </div>
      </div>
      <button className="nice-border" onClick={handleCreateStory}>
        创建
      </button>
    </div>
  );
}
