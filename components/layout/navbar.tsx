"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { useStoryByEmail } from "@/pages/[nickname]/request";

export default function NavBar({ session }: { session: Session | null }) {
  const { story } = useStoryByEmail(session?.user?.email || "");
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center font-display">
              <Image
                src="/logo.png"
                alt="logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              ></Image>
              {/* <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
                MeetU
              </p> */}
            </Link>
            <Link
              href="/stories"
              className="mx-4 flex items-center font-display hover:text-slate-500"
            >
              story
            </Link>
            <Link
              href="/about"
              className="flex items-center font-display hover:text-slate-500"
            >
              about
            </Link>
          </div>

          <div>
            {session ? (
              <UserDropdown session={session} story={story} />
            ) : (
              <button
                className="nice-border rounded-full border border-gray-100 text-sm hover:border-gray-800"
                onClick={() => setShowSignInModal(true)}
              >
                Sign in
              </button>
              // <button
              //   className="rounded-full border border-[#229beccb] bg-[#229beccb] p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-[#229beccb]"
              //   onClick={() => setShowSignInModal(true)}
              // >
              //   Sign in
              // </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
