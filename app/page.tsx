import { DEPLOY_URL } from "@/lib/constants";
import WebVitals from "@/components/home/web-vitals";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import "@/styles/home.css";
import HomeInput from "../components/home/home-input";
import "@/styles/globals.css";
import "@/styles/home.css";
import "@/styles/input.css";
import { Suspense } from "react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-cyan-50 via-yellow-50 to-yellow-100 pt-32">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <div className="z-10">
          <div className="mx-auto w-full max-w-[70%] text-center">
            <p className="title-font animate-fade-up text-center font-display text-3xl font-bold tracking-[-0.02em] text-slate-700 drop-shadow-sm md:text-5xl">
              <span
                className="items-end justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent "
                style={{
                  animationDelay: "0.15s",
                  animationFillMode: "forwards",
                }}
              >
                Meeting{" "}
              </span>
              you, a memory painted on the canvas of{" "}
              <span
                className="items-end justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent "
                style={{
                  animationDelay: "0.15s",
                  animationFillMode: "forwards",
                }}
              >
                forever
              </span>
              .
            </p>

            <p className="mt-5 text-slate-500">
              Enter your nickname ,and create your homepage with just one
              click.🎉
            </p>
            <HomeInput session={session} />

            <div className="mx-auto w-full text-center">
              {/* <Image
                src="/u2.png"
                alt="u2"
                width="128"
                height="128"
                className="w-32 rounded-sm md:w-24"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const features = [
  {
    title: "MeetU",
    description:
      "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
    large: true,
  },
  {
    title: "Performance first",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    demo: <WebVitals />,
  },
  {
    title: "One-click Deploy",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <a href={DEPLOY_URL}>
        <Image
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
          width={120}
          height={30}
          unoptimized
        />
      </a>
    ),
  },
  {
    title: "Built-in Auth + Database",
    description:
      "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
        <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
      </div>
    ),
  },
  {
    title: "Hooks, utilities, and more",
    description:
      "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
    demo: (
      <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
        <span className="font-mono font-semibold">useIntersectionObserver</span>
        <span className="font-mono font-semibold">useLocalStorage</span>
        <span className="font-mono font-semibold">useScroll</span>
        <span className="font-mono font-semibold">nFormatter</span>
        <span className="font-mono font-semibold">capitalize</span>
        <span className="font-mono font-semibold">truncate</span>
      </div>
    ),
  },
];
