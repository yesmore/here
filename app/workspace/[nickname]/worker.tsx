"use client";

import { useState, Dispatch, SetStateAction } from "react";
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
import Image from "next/image";
import { useStoryByNickname } from "@/pages/[nickname]/request";
import PlaceHolder from "@/components/shared/placeholder";
import "@/styles/input.css";
import ReactMarkdown from "react-markdown";

export default function Worker({
  session,
  nickname,
}: {
  session: Session | null;
  nickname: string;
}) {
  const { story, isLoading, isError } = useStoryByNickname(nickname);
  const [metaInfo, setMetaInfo] = useState<CreateStoryProps>({
    meta_bg_color: story?.meta_bg_color ?? "0",
    meta_text_color: story?.meta_text_color ?? "0",
    meta_font_size: story?.meta_font_size ?? "0",
    meta_font_style: story?.meta_font_style ?? "0",
    nickname: nickname,
    describtion: story?.describtion || "",
    public: story?.public || true,
    tags: story?.tags || [],
    email: session?.user?.email || "",
    avatar:
      session?.user?.image ||
      "https://gcloud-1303456836.cos.ap-chengdu.myqcloud.com/gcloud/avatars/21.png",
  });
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [showCreateLoading, setShowCreateLoading] = useState<boolean>(false);
  const [showLeftSider, setShowLeftSider] = useState<boolean>(true);
  const [showRightSider, setShowRightSider] = useState<boolean>(true);
  const [showBottomWidget, setShowBottomWidget] = useState<boolean>(false);
  const [showBottomMetaInfo, setShowBottomMetaInfo] = useState<boolean>(false);

  const handleCreateStory = async () => {
    setShowCreateLoading(true);
    setTimeout(() => {
      setShowCreateLoading(false);
    }, 10000);
    if (session?.user) {
      const res = await fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({
          metaInfo: metaInfo,
          email: session.user.email,
        }),
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
      setShowBottomWidget(false);
      setShowBottomMetaInfo(false);
      setShowCreateLoading(false);
      setShowSignInModal(true);
      toast("Please sign in first", { icon: "🥵" });
    }
  };

  const renderHeadTools = () => (
    <>
      <div className="header mb-1 flex h-10 w-full items-center justify-between">
        <Link
          href={`/${metaInfo.nickname}`}
          target="_blank"
          className="flex cursor-pointer gap-1 truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent"
        >
          Preview <ExternalLink className="w-4 text-slate-500" />
        </Link>

        <div className="tools hidden text-sm text-slate-600 hover:text-slate-800 md:flex">
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
        <div className="tools flex text-sm text-slate-600 hover:text-slate-800 md:hidden ">
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
        <div className="preview-area flex h-screen flex-col items-center">
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

function MetaInfoWorker({
  className,
  session,
  metaInfo,
  showCreateLoading,
  setMetaInfo,
  onCreateStory,
}: {
  className?: string;
  session: Session | null;
  metaInfo: CreateStoryProps;
  showCreateLoading: boolean;
  setMetaInfo: Dispatch<SetStateAction<CreateStoryProps>>;
  onCreateStory: () => void;
}) {
  return (
    <div className={`worker-info ${className}`}>
      <div className="basic">
        <div className="flex items-center justify-between">
          <Image
            src={metaInfo.avatar}
            alt="avatar"
            width="50"
            height="50"
            className="rounded-full border border-gray-300 "
          />
          <button
            className="nice-border w-34 h-8 text-sm"
            onClick={onCreateStory}
          >
            {showCreateLoading ? (
              <LoadingDots color="#070707" />
            ) : (
              <>Create {metaInfo.public && "& Publish"}</>
            )}
          </button>
        </div>

        <WorkerInput
          label="Nickname:"
          placeholder={metaInfo.nickname}
          setValue={(val) => setMetaInfo({ ...metaInfo, nickname: val })}
        />
        <WorkerTextareaInput
          label="Describtion:"
          placeholder={metaInfo.describtion || "support markdown"}
          setValue={(val) => setMetaInfo({ ...metaInfo, describtion: val })}
        />
      </div>

      <div className="mt-4 flex items-center justify-start gap-2">
        <div className="checkbox-wrapper-5">
          <div
            className="check"
            onClick={() =>
              setMetaInfo({ ...metaInfo, public: !metaInfo.public })
            }
          >
            <input
              onChange={() => null}
              checked={metaInfo.public}
              type="checkbox"
            />
            <label></label>
          </div>
        </div>
        <div className="flex items-center text-sm">
          Publish card to&nbsp;
          <Link
            href={`/stories`}
            target="_blank"
            className="flex cursor-pointer items-center gap-1 truncate bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-semibold text-transparent"
          >
            Story <ExternalLink className="w-4 text-slate-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const WidgetWorker = () => {
  return <>21312</>;
};

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

const WorkerInput = ({
  label,
  placeholder,
  setValue,
}: {
  label: string;
  placeholder: string;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="worker-input">
      <label className="text">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="input"
      />
    </div>
  );
};

const WorkerTextareaInput = ({
  label,
  placeholder,
  setValue,
}: {
  label: string;
  placeholder: string;
  type?: string;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="worker-textarea-input">
      <label className="text">{label}</label>
      <textarea
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="input"
      />
    </div>
  );
};
