"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import Image from "next/image";
import "@/styles/toggle.css";
import toast from "react-hot-toast";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import UserFooter from "@/components/layout/user-footer";
import Modal from "@/components/shared/modal";
import { ExternalLink, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";
import { useStoryByEmail } from "@/pages/[nickname]/request";
import PlaceHolder from "@/components/shared/placeholder";
import "@/styles/input.css";
import ReactMarkdown from "react-markdown";
import { MetaInfoWorker, WidgetWorker, WorkerSiderWrapper } from "./workerItem";
import { useSearchParams } from "next/navigation";
import { isAllAlphabetic } from "@/lib/utils";
import {
  layoutValueMappings,
  translateValueToColor,
  translateValueToFontStyle,
  translateValueToFontWeight,
  translateValueToSize,
} from "./enum";
import { UserStory } from "@/lib/types/story";
import MainView from "@/components/main/main-view";
import { DEFAULT_WOKER_AVATAR } from "@/lib/constants";

export default function Worker({ session }: { session: Session | null }) {
  const searchParams = useSearchParams();
  const input_nickname = searchParams.get("n") || "";
  const { story, isLoading, isError } = useStoryByEmail(
    session?.user?.email || "3224266014@qq.com",
  );

  const [metaInfo, setMetaInfo] = useState<UserStory>({
    id: story?.id,
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? DEFAULT_WOKER_AVATAR,
    nickname: story?.nickname ?? input_nickname,
    describtion: story?.describtion ?? "",
    public: story?.public ?? true,
    tags: story?.tags ?? [],
    view: story?.view ?? 0,
    meta_bg_color: story?.meta_bg_color ?? "0",
    meta_text_color: story?.meta_text_color ?? "0",
    meta_font_size: story?.meta_font_size ?? "0",
    meta_font_style: story?.meta_font_style ?? "0",
    meta_font_weight: story?.meta_font_weight ?? "0",
    meta_layout: story?.meta_layout ?? "0",
    meta_rounded: story?.meta_rounded ?? "0",
  });
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [showCreateLoading, setShowCreateLoading] = useState<boolean>(false);
  const [showLeftSider, setShowLeftSider] = useState<boolean>(true);
  const [showRightSider, setShowRightSider] = useState<boolean>(true);
  const [showBottomWidget, setShowBottomWidget] = useState<boolean>(false);
  const [showBottomMetaInfo, setShowBottomMetaInfo] = useState<boolean>(false);
  const [showOnPC, setShowOnPC] = useState<boolean>(true);
  const [canUpdateMetainfo, setCanUpdateMetainfo] = useState<boolean>(false);

  useEffect(() => {
    if (!metaInfo.id) {
      setMetaInfo({
        id: story?.id,
        email: session?.user?.email ?? "",
        avatar: session?.user?.image ?? DEFAULT_WOKER_AVATAR,
        nickname: story?.nickname ?? input_nickname,
        describtion: story?.describtion ?? "",
        public: story?.public ?? true,
        view: story?.view ?? 0,
        tags: story?.tags ?? [],
        meta_bg_color: story?.meta_bg_color ?? "0",
        meta_text_color: story?.meta_text_color ?? "0",
        meta_font_size: story?.meta_font_size ?? "0",
        meta_font_style: story?.meta_font_style ?? "0",
        meta_font_weight: story?.meta_font_weight ?? "0",
        meta_layout: story?.meta_layout ?? "0",
        meta_rounded: story?.meta_rounded ?? "0",
      });
    }
  }, [story, session?.user]);

  useEffect(() => {
    if (
      metaInfo.id &&
      (metaInfo.nickname !== story?.nickname ||
        metaInfo.describtion !== story?.describtion ||
        metaInfo.public !== story?.public ||
        metaInfo.tags !== story?.tags ||
        metaInfo.meta_bg_color !== story?.meta_bg_color ||
        metaInfo.meta_text_color !== story?.meta_text_color ||
        metaInfo.meta_font_size !== story?.meta_font_size ||
        metaInfo.meta_font_style !== story?.meta_font_style ||
        metaInfo.meta_font_weight !== story?.meta_font_weight ||
        metaInfo.meta_layout !== story?.meta_layout ||
        metaInfo.meta_rounded !== story?.meta_rounded)
    ) {
      setCanUpdateMetainfo(true);
    } else {
      setCanUpdateMetainfo(false);
    }
  }, [metaInfo]);

  const handleCreateStory = async () => {
    // setShowCreateLoading(true);
    if (!isAllAlphabetic(metaInfo.nickname)) {
      toast("Invalid nickname", { icon: "🥵" });
      return;
    }
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

  const getWrapperClassName = (metaInfo: UserStory) => {
    const pcClass = showOnPC ? "" : "max-w-md rounded-md shadow-xl ";

    const bgClass =
      Number(metaInfo.meta_bg_color) < 100
        ? translateValueToColor(metaInfo.meta_bg_color)
        : "";

    return `worker-wrapper mx-auto ${pcClass} ${bgClass}`;
  };
  const getWrapperPureStyle = (metaInfo: UserStory) => ({
    backgroundColor: ` ${
      Number(metaInfo.meta_bg_color) >= 100
        ? translateValueToColor(metaInfo.meta_bg_color)
        : "none"
    }`,
  });

  const renderHeadTools = () => (
    <>
      <div className="header mb-1 flex h-10 w-full items-center justify-between px-3">
        <Link
          href={`/${metaInfo.nickname}`}
          title="preview link"
          target="_blank"
          className="absolute left-3 flex cursor-pointer gap-1 truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent"
        >
          Preview <ExternalLink className="w-4 text-slate-500" />
        </Link>

        <div className="absolute right-3 ">
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
              {/* <Widgets className=" h-4 w-4 text-blue-700" /> */}
              <span className="truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent transition-all">
                Widgets
              </span>
            </button>
            <button
              className="ml-3 flex items-center gap-1 transition-all hover:opacity-50"
              onClick={() => setShowRightSider(!showRightSider)}
            >
              {/* <Color className=" h-4 w-4 text-blue-700" /> */}
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
              {/* <Widgets className="h-4 w-4 text-blue-700" /> */}
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
              {/* <Color className="h-4 w-4 text-blue-700" /> */}
              <span className="truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent transition-all">
                Palette
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={getWrapperClassName(metaInfo)}
      style={getWrapperPureStyle(metaInfo)}
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
        <MainView metaInfo={metaInfo} editable={true} />

        {/* 右侧编辑区 */}
        {showRightSider && (
          <WorkerSiderWrapper position="right">
            <MetaInfoWorker
              session={session}
              metaInfo={metaInfo}
              showCreateLoading={showCreateLoading}
              setMetaInfo={setMetaInfo}
              onCreateStory={handleCreateStory}
              canUpdateMetainfo={canUpdateMetainfo}
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
            canUpdateMetainfo={canUpdateMetainfo}
          />
        </Modal>
      </div>
    </div>
  );
}
