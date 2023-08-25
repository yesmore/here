"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center ">
      <Link
        href="/"
        className="flex flex-col items-center justify-center font-display"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width="30"
          height="30"
          className="rounded-sm"
        ></Image>
      </Link>
      <div className="mt-2 text-sm">
        <Link href="/privacy">Privacy policy</Link>
        <span className="mx-2">‣</span>
        <Link href="mailto:songsonghhhh@gmail.com">Contact</Link>
        <span className="mx-2">‣</span>
        <Link
          className="items-end justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-purple-500 bg-clip-text font-semibold text-transparent "
          href="https://discord.gg/utuNdj35vr"
          target="_blank"
        >
          Discord
        </Link>
      </div>
      <div className="mt-2 flex items-center justify-center text-sm">
        <span>Copyright © 2023 </span>
        <Link
          className="ml-1 font-medium text-gray-800 transition-colors"
          href="https://meetu.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          MeetU
        </Link>
      </div>
    </div>
  );
}
