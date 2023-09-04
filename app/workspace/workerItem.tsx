import { Session } from "next-auth";
import { CreateStoryProps } from "@/lib/db/story";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoadingDots } from "@/components/shared/icons";
import { ExternalLink } from "lucide-react";
import { colorValueMappings, translateValueToColor } from "./enum";

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
          ? "left-sider left-1 -translate-x-80 animate-slide-left-fade"
          : "right-sider right-1 translate-x-80 animate-slide-right-fade"
      } absolute top-12 z-10 hidden w-72 rounded-md bg-white p-3 shadow-md transition-all duration-500 md:block`}
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
}: {
  className?: string;
  session: Session | null;
  metaInfo: CreateStoryProps;
  showCreateLoading: boolean;
  setMetaInfo: Dispatch<SetStateAction<CreateStoryProps>>;
  onCreateStory: () => void;
}) => {
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
          <p>{metaInfo.tags}</p>
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
        <div className="bg-color mb-3">
          <p className=" font-mono text-sm font-semibold text-slate-500">
            BACKGROUND
          </p>
          <div className="flex items-center gap-2">
            {Object.keys(colorValueMappings).map((key: string) => (
              <div
                className={
                  " h-10 w-10 cursor-pointer rounded border transition-all hover:shadow-md" +
                  ` ${
                    key === metaInfo.meta_bg_color
                      ? " border-2 border-slate-200"
                      : ""
                  }` +
                  ` ${Number(key) < 100 ? colorValueMappings[key] : ""}`
                }
                style={{
                  backgroundColor: `${
                    Number(key) >= 100 ? colorValueMappings[key] : ""
                  }`,
                }}
                key={key}
                onClick={() => {
                  setMetaInfo({ ...metaInfo, meta_bg_color: key });
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="text-color">
          <p className=" font-mono text-sm font-semibold text-slate-500">
            TEXT
          </p>
          <div className="flex items-center gap-1">
            {Object.keys(colorValueMappings).map(
              (key: string) =>
                Number(key) >= 100 && (
                  <div
                    className={
                      " h-5 w-5 cursor-pointer rounded-full border transition-all hover:shadow-md" +
                      ` ${
                        key === metaInfo.meta_text_color
                          ? " border-2 border-slate-200"
                          : ""
                      }`
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

        <div className="font-size"></div>
        <div className="font-weight"></div>
        <div className="font-style"></div>
      </div>

      <button
        className="nice-border my-4 h-8 w-full text-sm "
        onClick={onCreateStory}
      >
        {showCreateLoading ? (
          <LoadingDots color="#070707" />
        ) : (
          <>
            {metaInfo.nickname ? "Update" : "Create"}{" "}
            {metaInfo.public && "& Publish"}
          </>
        )}
      </button>

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
  return <div className="p-3">21312</div>;
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
