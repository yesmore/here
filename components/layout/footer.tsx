import { nFormatter } from "@/lib/utils";
import { Github } from "../shared/icons";

export default function Footer() {
  return (
    <div className="absolute flex w-full items-center justify-center border-t border-gray-200 bg-white py-5">
      {/* <a
        className="max-w-fit hover:border-gray-800"
        href="https://github.com/yesmore/meetu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
      </a> */}
      <span>Copyright © 2023 </span>
      <a
        className="ml-1 font-medium text-gray-800 underline transition-colors"
        href="https://meetu.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        MeetU
      </a>
      {/* <a
        className="nice-border flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-100 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
        href="https://github.com/yesmore/meetu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
        <p>
          <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
        </p>
      </a> */}
    </div>
  );
}
