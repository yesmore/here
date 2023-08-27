"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Session } from "next-auth";
import { CreateStoryProps } from "@/lib/db/story";
import "@/styles/toggle.css";
import toast from "react-hot-toast";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { Color, LoadingDots, Widgets } from "@/components/shared/icons";
import UserFooter from "@/components/layout/user-footer";
import Modal from "@/components/shared/modal";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Worker({
  session,
  nickname,
}: {
  session: Session | null;
  nickname: string;
}) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [showCreateLoading, setShowCreateLoading] = useState<boolean>(false);
  const [name, setNickname] = useState<string>(nickname);
  const [tags, setTags] = useState<string[]>([]);
  const [describtion, setDescribtion] = useState<string>("");
  const [publicStory, setPublic] = useState<boolean>(true);
  const [showLeftSider, setShowLeftSider] = useState<boolean>(true);
  const [showRightSider, setShowRightSider] = useState<boolean>(true);
  const [showBottomWidget, setShowBottomWidget] = useState<boolean>(false);
  const [showBottomMetaInfo, setShowBottomMetaInfo] = useState<boolean>(false);

  // useEffect(() => {
  //   setNickname(nickname);
  // }, [nickname]);

  const handleCreateStory = async () => {
    setShowCreateLoading(true);
    setTimeout(() => {
      setShowCreateLoading(false);
    }, 10000);
    if (session?.user) {
      const res = await fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({
          nickname: name,
          email: session.user.email,
          tags: tags,
          describtion: describtion,
          public: publicStory,
        } as CreateStoryProps),
      });
      if (res.ok) {
        setShowCreateLoading(false);
        const resJson = await res.json();
        if (resJson === "success") {
          toast("Ready!", { icon: "🎉" });
        } else {
          toast(resJson, { icon: "🥵" });
        }
      }
    } else {
      setShowCreateLoading(false);
      setShowSignInModal(true);
      toast("Please sign in first", { icon: "🥵" });
    }
  };

  const renderHeadTools = () => (
    <>
      <div className="header mb-1 flex h-10 w-full items-center justify-between">
        <Link
          href={`/${name}`}
          target="_blank"
          className="flex cursor-pointer gap-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent "
        >
          meetu.dev/{name} <ExternalLink className="w-4 text-slate-500" />
        </Link>
        <div className="tools hidden text-sm text-slate-600 md:flex">
          <button
            className="flex items-center gap-1"
            onClick={() => setShowLeftSider(!showLeftSider)}
          >
            <Widgets className=" h-4 w-4" />
            Widgets
          </button>
          <button
            className="ml-3 flex items-center gap-1"
            onClick={() => setShowRightSider(!showRightSider)}
          >
            <Color className=" h-4 w-4" />
            Palette
          </button>
        </div>
        <div className="tools flex text-sm text-slate-600 md:hidden ">
          <button
            className="flex items-center gap-1"
            onClick={() => {
              setShowBottomMetaInfo(false);
              setShowBottomWidget(!showBottomWidget);
            }}
          >
            <Widgets className=" h-4 w-4" />
            Widgets
          </button>
          <button
            className="ml-3 flex items-center gap-1"
            onClick={() => {
              setShowBottomWidget(false);
              setShowBottomMetaInfo(!showBottomMetaInfo);
            }}
          >
            <Color className=" h-4 w-4" />
            Palette
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="worker-wrapper dot-bg bg-gradient-to-br from-cyan-50 via-yellow-50 to-yellow-100 px-3">
      {renderHeadTools()}
      {/* main */}
      <div className="relative mx-auto h-screen overflow-x-hidden">
        {/* 左侧编辑区 */}
        {showLeftSider && (
          <WorkerSiderWrapper position="left">
            <WidgetWorker />
          </WorkerSiderWrapper>
        )}

        {/* 中间预览区 */}
        <div className="preview-area flex h-screen justify-center">
          {name}
          <UserFooter />
        </div>

        {/* 右侧编辑区 */}
        {showRightSider && (
          <WorkerSiderWrapper position="right">
            <button className="nice-border w-40" onClick={handleCreateStory}>
              {showCreateLoading ? (
                <LoadingDots color="#070707" />
              ) : (
                <>Create {publicStory && "& Publish"}</>
              )}
            </button>
            <MetaInfoWorker
              nickname={name}
              describtion={describtion}
              publicStory={publicStory}
              setNickname={setNickname}
              setPublic={setPublic}
              setDescribtion={setDescribtion}
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
            nickname={name}
            describtion={describtion}
            publicStory={publicStory}
            setNickname={setNickname}
            setPublic={setPublic}
            setDescribtion={setDescribtion}
          />
        </Modal>
      </div>
    </div>
  );
}

function MetaInfoWorker({
  nickname,
  setNickname,
  describtion,
  setDescribtion,
  publicStory,
  setPublic,
}: {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  describtion: string;
  setDescribtion: Dispatch<SetStateAction<string>>;
  publicStory: boolean;
  setPublic: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="">
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        value={describtion}
        type="text"
        onChange={(e) => setDescribtion(e.target.value)}
      />

      <div className="checkbox-wrapper-5">
        <div className="check" onClick={() => setPublic(!publicStory)}>
          <input onChange={() => null} checked={publicStory} type="checkbox" />
          <label></label>
        </div>
      </div>
    </div>
  );
}

function WidgetWorker() {
  return <>21312</>;
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
      } absolute top-0 z-10 hidden w-64 rounded-md bg-white p-2 shadow-md transition-all duration-500 md:block`}
      style={{
        animationDelay: "0.15s",
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
};
const WorkerBottomWrapperModal = ({
  showModal,
  setShowModal,
  children,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      {children}
    </Modal>
  );
};
