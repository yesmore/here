import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoadingDots } from "@/components/shared/icons";
import { ExternalLink } from "lucide-react";
import { colorValueMappings, sizeValueMappings } from "./enum";
import { UserStory } from "@/lib/types/story";

export const WorkerSiderWrapper = ({
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
          ? "left-sider left-3 -translate-x-80 animate-slide-left-fade"
          : "right-sider right-3 translate-x-80 animate-slide-right-fade"
      } absolute top-12 z-10 hidden h-3/4 w-72 overflow-y-auto rounded-md bg-white p-3 shadow-md transition-all duration-500 md:block`}
      style={{
        animationDelay: "0.15s",
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
};

export const MetaInfoWorker = ({
  className,
  session,
  metaInfo,
  showCreateLoading,
  setMetaInfo,
  onCreateStory,
  canUpdateMetainfo,
}: {
  className?: string;
  session: Session | null;
  metaInfo: UserStory;
  showCreateLoading: boolean;
  setMetaInfo: Dispatch<SetStateAction<UserStory>>;
  onCreateStory: () => void;
  canUpdateMetainfo: boolean;
}) => {
  const selectedBorder = (isShow: Boolean) => {
    return isShow
      ? "duration-200 [border-width:3px] border-gray-300 inset-[2px]"
      : "";
  };
  const selectedBackground = (isShow: Boolean) => {
    return isShow ? "bg-yellow-50" : "";
  };

  return (
    <div className={`worker-info ${className} `}>
      <div className="basic">
        <div className="flex items-center justify-between">
          <Image
            src={metaInfo.avatar ?? ""}
            alt="avatar"
            width="50"
            height="50"
            className="rounded-full border border-gray-300 "
          />
          <button
            className={
              "flex h-8 w-36 items-center justify-center transition-all" +
              ` ${
                !canUpdateMetainfo
                  ? "rounded-md bg-slate-300"
                  : "nice-border bg-white"
              }`
            }
            onClick={onCreateStory}
            disabled={!canUpdateMetainfo}
          >
            {showCreateLoading ? (
              <LoadingDots color="#070707" />
            ) : (
              <>
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-sm font-semibold text-transparent">
                  {metaInfo.nickname ? "Update" : "Create"}
                </span>
                🎉
              </>
            )}
          </button>
        </div>

        <WorkerInput
          label="Nickname:"
          value={metaInfo.nickname}
          setValue={(val) => setMetaInfo({ ...metaInfo, nickname: val })}
        />
        <WorkerTextareaInput
          label="Describtion:"
          value={metaInfo.describtion}
          setValue={(val) => setMetaInfo({ ...metaInfo, describtion: val })}
        />
      </div>

      <div className="meta mt-3">
        <div className="layout-setting mb-3">
          <p className="mb-1 font-mono text-sm font-semibold text-slate-400">
            Layout
          </p>
          <div className="flex gap-3">
            <div
              className={
                "w-full cursor-pointer rounded-full bg-gray-50 px-2 py-1 text-center text-sm shadow hover:shadow" +
                ` ${selectedBackground(metaInfo.meta_layout === "1")}`
              }
              onClick={() =>
                setMetaInfo({
                  ...metaInfo,
                  meta_layout: metaInfo.meta_layout === "0" ? "1" : "0",
                })
              }
            >
              Center
            </div>
            <div
              className={
                "w-full cursor-pointer rounded-full bg-gray-50 px-2 py-1 text-center text-sm shadow hover:shadow" +
                ` ${selectedBackground(metaInfo.meta_rounded === "1")}`
              }
              onClick={() =>
                setMetaInfo({
                  ...metaInfo,
                  meta_rounded: metaInfo.meta_rounded === "0" ? "1" : "0",
                })
              }
            >
              Rounded
            </div>
          </div>
        </div>
        <div className="bg-color mb-3">
          <p className="mb-1 font-mono text-sm font-semibold text-slate-400">
            Background
          </p>
          <div className="flex flex-wrap items-center gap-[10px]">
            {Object.keys(colorValueMappings).map(
              (key: string) =>
                Number(key) >= 100 && (
                  <div
                    className={
                      "h-6 w-6 cursor-pointer rounded-full shadow transition-all hover:shadow-md" +
                      ` ${selectedBorder(key === metaInfo.meta_bg_color)}`
                    }
                    style={{
                      backgroundColor: `${colorValueMappings[key]}`,
                    }}
                    key={key}
                    onClick={() => {
                      setMetaInfo({ ...metaInfo, meta_bg_color: key });
                    }}
                  ></div>
                ),
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-[10px]">
            {Object.keys(colorValueMappings).map(
              (key: string) =>
                Number(key) < 100 && (
                  <div
                    className={
                      " h-6 w-6 cursor-pointer rounded-md shadow transition-all hover:shadow-md" +
                      ` ${selectedBorder(key === metaInfo.meta_bg_color)}` +
                      ` ${colorValueMappings[key]}`
                    }
                    key={key}
                    onClick={() => {
                      setMetaInfo({ ...metaInfo, meta_bg_color: key });
                    }}
                  ></div>
                ),
            )}
          </div>
        </div>
        <div className="text-color mb-3">
          <p className="mb-1 font-mono text-sm font-semibold text-slate-400">
            Text
          </p>
          <div className="flex flex-wrap items-center gap-[10px]">
            {Object.keys(colorValueMappings)
              .slice(10, 19)
              .map(
                (key: string) =>
                  Number(key) >= 100 && (
                    <div
                      className={
                        " h-5 w-5 cursor-pointer rounded-full shadow transition-all hover:shadow-md" +
                        ` ${selectedBorder(key === metaInfo.meta_text_color)}`
                      }
                      style={{
                        backgroundColor: `${colorValueMappings[key]}`,
                      }}
                      key={key}
                      onClick={() => {
                        setMetaInfo({ ...metaInfo, meta_text_color: key });
                      }}
                    ></div>
                  ),
              )}
          </div>
        </div>
        <div className="font-setting mb-3">
          <p className="mb-1 font-mono text-sm font-semibold text-slate-400">
            Font
          </p>
          <div className="grid grid-cols-3 items-center rounded-full bg-gray-50 px-2 py-1 text-center shadow transition-all">
            {Object.keys(sizeValueMappings).map((key) => (
              <div
                key={key}
                className={
                  " h-6 cursor-pointer rounded-lg transition-all" +
                  ` ${selectedBackground(key === metaInfo.meta_font_size)}`
                }
                style={{
                  fontSize: `${sizeValueMappings[key]}px`,
                  lineHeight: "24px",
                }}
                onClick={() =>
                  setMetaInfo({ ...metaInfo, meta_font_size: key })
                }
              >
                {sizeValueMappings[key]}px
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            <div
              className={
                "w-full cursor-pointer rounded-full bg-gray-50 px-2 py-1 text-center text-sm shadow hover:shadow" +
                ` ${selectedBackground(metaInfo.meta_font_style === "1")}`
              }
              onClick={() =>
                setMetaInfo({
                  ...metaInfo,
                  meta_font_style: metaInfo.meta_font_style === "0" ? "1" : "0",
                })
              }
            >
              Italic
            </div>
            <div
              className={
                "w-full cursor-pointer rounded-full bg-gray-50 px-2 py-1 text-center text-sm shadow hover:shadow" +
                ` ${selectedBackground(metaInfo.meta_font_weight === "1")}`
              }
              onClick={() =>
                setMetaInfo({
                  ...metaInfo,
                  meta_font_weight:
                    metaInfo.meta_font_weight === "0" ? "1" : "0",
                })
              }
            >
              Bold
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-start gap-2">
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
};

export const WidgetWorker = () => {
  return <div className="p-3">...</div>;
};

export const WorkerInput = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="worker-input">
      <label className="text">{label}</label>
      <input
        type="text"
        placeholder="please enter nickname"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="input"
      />
    </div>
  );
};

export const WorkerTextareaInput = ({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  type?: string;
  setValue: (value: string) => void;
}) => {
  return (
    <div className="worker-textarea-input">
      <label className="text">{label}</label>
      <textarea
        placeholder="support markdown"
        value={value}
        onChange={(e) =>
          setValue(
            e.target.value.length <= 200
              ? e.target.value
              : e.target.value.substring(0, 200),
          )
        }
        className="input"
      />
    </div>
  );
};
