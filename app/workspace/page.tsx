import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";

import InputArea from "./inputArea";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function Workspace() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 w-full px-5 xl:px-0">
        <InputArea session={session} />
      </div>
    </>
  );
}
