"use client";

export default function Footer() {
  return (
    <div className=" absolute flex w-full items-center justify-center border-t border-gray-200 bg-white py-5 text-sm">
      <span>Copyright © 2023 </span>
      <a
        className="ml-1 font-medium text-gray-800 transition-colors"
        href="https://meetu.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        MeetU
      </a>
    </div>
  );
}
