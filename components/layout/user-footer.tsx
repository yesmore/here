"use client";

import Link from "next/link";
import Image from "next/image";

export default function UserFooter() {
  return (
    <>
      <div
        className="absolute bottom-10 left-[50%]"
        style={{ transform: "translate(-50%, 0)" }}
      >
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
          {/* <p>Meet U</p> */}
          <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
            Meet.U
          </p>
        </Link>
      </div>
    </>
  );
}
