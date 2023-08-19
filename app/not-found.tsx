import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  return (
    <>
      <div className="text-dark-100 z-10 flex w-full max-w-xl flex-col items-center justify-center px-5">
        <Image
          src="/not-found.svg"
          alt="404"
          width="250"
          height="250"
          className="ml-4 rounded-sm"
        />
        <Link
          href="/"
          className="nice-border mt-24 border text-sm hover:border-gray-800"
        >
          404 Return void
        </Link>
      </div>
    </>
  );
}
