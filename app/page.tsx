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
import { ReactNode, Suspense } from "react";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import SocialCard from "@/components/home/home-social-card";
import { Github, Google, Twitter } from "@/components/shared/icons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="w-full bg-gradient-to-br from-cyan-50 via-yellow-50 to-yellow-100 pt-32">
        {/* @ts-expect-error Server Component */}
        <Nav />
        <div className="z-10 pb-12">
          <div
            className="mx-auto w-full max-w-[80%] text-center md:max-w-[70%]"
            style={{
              animationDelay: "0.15s",
              animationFillMode: "forwards",
            }}
          >
            <p className="title-font animate-fade-up text-center font-display text-3xl font-bold tracking-[-0.02em] text-slate-700 drop-shadow-sm md:text-5xl">
              <span className="items-end justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
                Make{" "}
              </span>
              your unique space, and stay here{" "}
              <span className="items-end justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
                forever.
              </span>
            </p>

            <p className="mt-5 animate-fade-up text-slate-500 ">
              Enter a nickname ,and create your homepage with just one click.🎉
            </p>
            <HomeInput session={session} />
          </div>
          <About />
        </div>
      </div>
      <Footer />
    </>
  );
}

function About() {
  return (
    <div>
      <div className="grids mx-auto mt-12 max-w-[80%] text-center">
        <div className="z-10 flex w-full items-center justify-center gap-8 py-8 md:gap-12">
          <CardItem
            bgColor="bg-cyan-400"
            rotate="rotate-12 origin-top-left"
            icon={<Github />}
          />

          <CardItem bgColor="bg-orange-400" rotate="rotate-45" icon="🎉" />
          <CardItem
            rotate="rotate-12 origin-top-left"
            icon={<Twitter className="h-4 w-4 text-blue-400" />}
          />
          <CardItem bgColor="bg-pink-400" rotate="-rotate-12" icon="🎭" />
        </div>
        <div className="pb-8 pt-2 text-2xl font-semibold">
          Choose the{" "}
          <span className="items-end justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
            links{" "}
          </span>
          that best represents you.
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[80%] items-center justify-center ">
        {/* <SocialCard /> */}
      </div>
    </div>
  );
}

function CardItem({
  bgColor = "bg-yellow-400",
  rotate = "rotate-12",
  icon,
}: {
  bgColor?: string;
  rotate?: string;
  icon: ReactNode;
}) {
  return (
    <>
      <div
        className={
          `${bgColor} ${rotate}` +
          " flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl text-xl shadow-md transition-all hover:rotate-0 md:h-20 md:w-20"
        }
      >
        <span className="md:scale-150">{icon}</span>
      </div>
    </>
  );
}
