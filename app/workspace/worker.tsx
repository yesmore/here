"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { CreateStoryProps } from "@/lib/db/story";
import "@/styles/toggle.css";
import toast from "react-hot-toast";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { Color, Widgets } from "@/components/shared/icons";
import UserFooter from "@/components/layout/user-footer";
import Modal from "@/components/shared/modal";
import { ExternalLink, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";
import { useStoryByEmail } from "@/pages/[nickname]/request";
import PlaceHolder from "@/components/shared/placeholder";
import "@/styles/input.css";
import ReactMarkdown from "react-markdown";
import { MetaInfoWorker, WidgetWorker } from "./workerItem";

export default function Worker({ session }: { session: Session | null }) {
  const { story, isLoading, isError } = useStoryByEmail(
    session?.user?.email || "",
  );

  const [metaInfo, setMetaInfo] = useState<CreateStoryProps>({
    id: story?.id,
    nickname: story?.nickname ?? "",
    describtion: story?.describtion || "",
    public: story?.public || true,
    tags: story?.tags || [],
    email: session?.user?.email || "",
    avatar:
      session?.user?.image ||
      "https://gcloud-1303456836.cos.ap-chengdu.myqcloud.com/gcloud/avatars/21.png",
    meta_bg_color: story?.meta_bg_color ?? "0",
    meta_text_color: story?.meta_text_color ?? "0",
    meta_font_size: story?.meta_font_size ?? "0",
    meta_font_style: story?.meta_font_style ?? "0",
  });
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [showCreateLoading, setShowCreateLoading] = useState<boolean>(false);
  const [showLeftSider, setShowLeftSider] = useState<boolean>(true);
  const [showRightSider, setShowRightSider] = useState<boolean>(true);
  const [showBottomWidget, setShowBottomWidget] = useState<boolean>(false);
  const [showBottomMetaInfo, setShowBottomMetaInfo] = useState<boolean>(false);
  const [showOnPC, setShowOnPC] = useState<boolean>(true);

  useEffect(() => {
    setMetaInfo({
      meta_bg_color: story?.meta_bg_color ?? "0",
      meta_text_color: story?.meta_text_color ?? "0",
      meta_font_size: story?.meta_font_size ?? "0",
      meta_font_style: story?.meta_font_style ?? "0",
      nickname: story?.nickname ?? "",
      describtion: story?.describtion || "",
      public: story?.public || true,
      tags: story?.tags || [],
      email: session?.user?.email || "",
      avatar:
        session?.user?.image ||
        "https://gcloud-1303456836.cos.ap-chengdu.myqcloud.com/gcloud/avatars/21.png",
    });
  }, [story, session?.user]);

  const handleCreateStory = async () => {
    setShowCreateLoading(true);
    setTimeout(() => {
      setShowCreateLoading(false);
    }, 30000);
    if (session?.user) {
      const res = await fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({
          metaInfo: metaInfo,
        }),
      });
      if (res.ok) {
        setShowCreateLoading(false);
        const resJson = await res.json();
        if (["Updated", "Created"].includes(resJson)) {
          toast(resJson, { icon: "🎉" });
        } else {
          toast(resJson, { icon: "🥵" });
        }
      }
    } else {
      setShowBottomWidget(false);
      setShowBottomMetaInfo(false);
      setShowCreateLoading(false);
      setShowSignInModal(true);
      toast("Please sign in first", { icon: "🥵" });
    }
  };
  const handleShowOnPC = () => {
    setShowLeftSider(false);
    setShowRightSider(false);
    setShowOnPC(true);
  };
  const handleShowOnMobile = () => {
    setShowLeftSider(false);
    setShowRightSider(false);
    setShowOnPC(false);
  };

  const renderHeadTools = () => (
    <>
      <div className="header mb-1 flex h-10 w-full items-center justify-between px-3">
        <Link
          href={`/${metaInfo.nickname}`}
          title="preview link"
          target="_blank"
          className="flex cursor-pointer gap-1 truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent"
        >
          Preview <ExternalLink className="w-4 text-slate-500" />
        </Link>

        <div className="tools hidden text-sm md:flex">
          <button
            className={
              "flex items-center gap-1 rounded-full transition-all hover:opacity-50 " +
              `${showOnPC && "bg-gray-200 p-2"}`
            }
            title="PC"
            onClick={handleShowOnPC}
          >
            <Monitor className=" h-4 w-4" />
          </button>
          <button
            className={
              "mx-2 flex items-center gap-1 rounded-full transition-all hover:opacity-50 " +
              `${!showOnPC && " bg-gray-200 p-2"}`
            }
            onClick={handleShowOnMobile}
            title="Mobile"
          >
            <Smartphone className=" h-4 w-4" />
          </button>
          <button
            className="flex items-center gap-1 transition-all hover:opacity-50"
            onClick={() => setShowLeftSider(!showLeftSider)}
          >
            <Widgets className=" h-4 w-4 text-blue-700" />
            <span className="truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent transition-all">
              Widgets
            </span>
          </button>
          <button
            className="ml-3 flex items-center gap-1 transition-all hover:opacity-50"
            onClick={() => setShowRightSider(!showRightSider)}
          >
            <Color className=" h-4 w-4 text-blue-700" />
            <span className="truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent transition-all">
              Palette
            </span>
          </button>
        </div>
        {/* mobile */}
        <div className="tools flex text-sm text-slate-600 hover:text-slate-800 md:hidden ">
          <button
            className="flex items-center gap-1"
            onClick={() => {
              setShowBottomMetaInfo(false);
              setShowBottomWidget(!showBottomWidget);
            }}
          >
            <Widgets className="h-4 w-4 text-blue-700" />
            <span className="truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent transition-all">
              Widgets
            </span>
          </button>
          <button
            className="ml-3 flex items-center gap-1"
            onClick={() => {
              setShowBottomWidget(false);
              setShowBottomMetaInfo(!showBottomMetaInfo);
            }}
          >
            <Color className="h-4 w-4 text-blue-700" />
            <span className="truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent transition-all">
              Palette
            </span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={
        "worker-wrapper mx-auto bg-gradient-to-br from-cyan-50 via-yellow-50 to-yellow-100" +
        ` ${showOnPC ? "" : "max-w-md rounded-md shadow-xl "}`
      }
    >
      {renderHeadTools()}
      {/* main */}
      <div className="mx-auto h-screen">
        {/* 左侧编辑区 */}
        {showLeftSider && (
          <WorkerSiderWrapper position="left">
            <WidgetWorker />
          </WorkerSiderWrapper>
        )}

        {/* 中间预览区 */}
        <div
          className={
            "preview-area mx-auto flex h-screen flex-col items-center px-3 pt-3 " +
            ` ${showOnPC ? "" : "max-w-md"}`
          }
        >
          <p>{metaInfo.nickname}</p>
          <ReactMarkdown>{metaInfo.describtion}</ReactMarkdown>

          {/* <PlaceHolder /> */}
          <UserFooter />
        </div>

        {/* 右侧编辑区 */}
        {showRightSider && (
          <WorkerSiderWrapper position="right">
            <MetaInfoWorker
              session={session}
              metaInfo={metaInfo}
              showCreateLoading={showCreateLoading}
              setMetaInfo={setMetaInfo}
              onCreateStory={handleCreateStory}
            />
          </WorkerSiderWrapper>
        )}
      </div>

      <div className="modals">
        <SignInModal />
        <Modal
          showModal={showBottomWidget}
          setShowModal={setShowBottomWidget}
          showBlur={false}
        >
          <p
            className="ml-2 w-10 rounded-md border text-center text-sm text-slate-500 hover:bg-gray-300 hover:text-slate-700"
            onClick={() => setShowBottomWidget(false)}
          >
            ESC
          </p>
          <WidgetWorker />
        </Modal>
        <Modal
          showModal={showBottomMetaInfo}
          setShowModal={setShowBottomMetaInfo}
          showBlur={false}
        >
          <p
            className="ml-2 w-10 rounded-md border text-center text-sm text-slate-500 hover:bg-gray-300 hover:text-slate-700"
            onClick={() => setShowBottomMetaInfo(false)}
          >
            ESC
          </p>
          <MetaInfoWorker
            className="p-3"
            session={session}
            metaInfo={metaInfo}
            showCreateLoading={showCreateLoading}
            setMetaInfo={setMetaInfo}
            onCreateStory={handleCreateStory}
          />
        </Modal>
      </div>
    </div>
  );
}

const WorkerSiderWrapper = ({
  children,
  position,
}: {
  children: React.ReactNode;
  position: "right" | "left";
}) => {
  return (
    <div
      className={`
      ${
        position == "left"
          ? "left-sider left-1 -translate-x-72 animate-slide-left-fade"
          : "right-sider right-1 translate-x-72 animate-slide-right-fade"
      } absolute top-12 z-10 hidden w-64 rounded-md bg-white p-2 shadow-md transition-all duration-500 md:block`}
      style={{
        animationDelay: "0.15s",
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
};
