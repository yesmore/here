import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import { getUsers } from "@/lib/db/user";
import StoryBrodar from "./broader";
// import { useEffect, useState } from "react";

export default async function Stories() {
  // const data = await getUsers();
  // console.log(data1);

  const result = await fetch(process.env.BASE_URL + "/api/users", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));

  // const [x, setX] = useState();
  // console.log(data1);

  // useEffect(() => {
  //   setX(data1);
  // }, []);
  const data = "";

  const handleChange = (val: string) => {
    console.log(val);
  };

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer></Balancer>
        </h1>
        {/* <StoryBrodar value={result} onChange={handleChange} /> */}
        {/* {JSON.stringify(result)} */}

        {/* {result.map((item: any) => {
          return <>{item.name}</>;
        })} */}

        {/* 注册1：{data.length} */}
        {/* 注册2：{data1.length} */}
        {/* {x && (
          <div>
            注册：{x.length}
            {x.map((item: any) => {
              return <>{item.name}</>;
            })}
          </div>
        )} */}
      </div>
    </>
  );
}
