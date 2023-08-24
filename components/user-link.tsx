"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { useStoryByEmail } from "@/pages/[nickname]/request";
import { ExternalLink } from "lucide-react";
import { UserStory } from "@/lib/types/story";

export function UserLink({
  session,
  text = "Link now",
}: {
  session: Session | null;
  text?: string;
}) {
  const { story, isLoading } = useStoryByEmail(session?.user?.email || "");

  if (!isLoading && story?.nickname) {
    return (
      <>
        <div className="nice-border mx-auto mt-6 flex w-32 items-center justify-center gap-2">
          <Link
            // href={""}
            target="_blank"
            href={`/${story.nickname}`}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
          >
            {text}
          </Link>
          <ExternalLink className="w-4 text-slate-400" />
        </div>
      </>
    );
  }

  return null;
}

export function UserLinkByName({
  story,
  text = "Link now",
}: {
  story?: UserStory;
  text?: string;
}) {
  if (story?.nickname) {
    return (
      <>
        <div className="nice-border mx-auto mt-6 flex w-32 items-center justify-center gap-2">
          <Link
            // href={""}
            target="_blank"
            href={`/${story.nickname}`}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
          >
            {text}
          </Link>
          <ExternalLink className="w-4 text-slate-400" />
        </div>
      </>
    );
  }

  return null;
}
