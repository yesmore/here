"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <div className=" absolute flex w-full items-center justify-center border-t border-gray-200 bg-white py-5 text-sm">
      <span>Copyright © 2023 </span>
      <Link
        className="ml-1 font-medium text-gray-800 transition-colors"
        href="https://meetu.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        MeetU
      </Link>
      <span className="mx-2">‣</span>
      <Link href="/privacy">Privacy</Link>
    </div>
  );
}
