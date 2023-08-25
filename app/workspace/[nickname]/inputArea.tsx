"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { CreateStoryProps } from "@/lib/db/story";
import "@/styles/toggle.css";
import toast from "react-hot-toast";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { LoadingDots } from "@/components/shared/icons";

export default function InputArea({
  session,
  nickname,
}: {
  session: Session | null;
  nickname: string;
}) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [showCreateLoading, setShowCreateLoading] = useState<boolean>(false);
  const [name, setNickname] = useState<string>(nickname);
  const [tags, setTags] = useState<string[]>([]);
  const [describtion, setDescribtion] = useState<string>("");
  const [publicStory, setPublic] = useState<boolean>(true);

  // useEffect(() => {
  //   setNickname(nickname);
  // }, [nickname]);

  const handleCreateStory = async () => {
    setShowCreateLoading(true);
    setTimeout(() => {
      setShowCreateLoading(false);
    }, 10000);
    if (session?.user) {
      const res = await fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({
          nickname: name,
          email: session.user.email,
          tags: tags,
          describtion: describtion,
          public: publicStory,
        } as CreateStoryProps),
      });
      if (res.ok) {
        setShowCreateLoading(false);
        const resJson = await res.json();
        if (resJson === "success") {
          toast("Ready!", { icon: "🎉" });
        } else {
          toast(resJson, { icon: "🥵" });
        }
      }
    } else {
      setShowSignInModal(true);
      toast("Please sign in first");
    }
  };

  return (
    <div className="grids">
      <SignInModal />
      <input
        type="text"
        value={name}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input type="text" onChange={(e) => setDescribtion(e.target.value)} />

      <div className="checkbox-wrapper-5">
        <div className="check" onClick={() => setPublic(!publicStory)}>
          <input onChange={() => null} checked={publicStory} type="checkbox" />
          <label></label>
        </div>
      </div>
      <button className="nice-border w-40" onClick={handleCreateStory}>
        {showCreateLoading ? (
          <LoadingDots color="#070707" />
        ) : (
          <>Create {publicStory && "& Publish"}</>
        )}
      </button>
    </div>
  );
}
