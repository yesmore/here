import { UserStory } from "@/lib/types/story";
import {
  layoutValueMappings,
  roundedValueMappings,
  translateValueToColor,
  translateValueToFontStyle,
  translateValueToFontWeight,
  translateValueToSize,
} from "@/pages/workspace/enum";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import UserFooter from "../layout/user-footer";

export default function MainView({
  metaInfo,
  editable,
}: {
  metaInfo: UserStory;
  editable: boolean;
}) {
  const isCenterLayout = layoutValueMappings[metaInfo.meta_layout] === "center";
  const isRounded = roundedValueMappings[metaInfo.meta_rounded] === "rounded";
  const getWrapperClassName = (metaInfo: UserStory) => {
    const bgClass =
      Number(metaInfo.meta_bg_color) < 100
        ? translateValueToColor(metaInfo.meta_bg_color)
        : "";
    const padding = !editable ? "pt-12" : "";

    return `main-story mx-auto ${bgClass} ${padding}`;
  };
  const getWrapperPureStyle = (metaInfo: UserStory) => ({
    backgroundColor: ` ${
      Number(metaInfo.meta_bg_color) >= 100
        ? translateValueToColor(metaInfo.meta_bg_color)
        : "none"
    }`,
  });
  const getPreviewAreaClassName = (metaInfo: UserStory | UserStory) => {
    const layoutClass =
      layoutValueMappings[metaInfo.meta_layout] === "center"
        ? "flex-col items-center justify-center"
        : "flex-row items-start justify-start gap-4";

    // const loadingClass = showCreateLoading ? "motion-safe:animate-pulse" : "";

    return `head-info flex justify-start transition-all ${layoutClass} `;
  };
  const getPreviewAreaStyle = (metaInfo: UserStory) => ({
    color: translateValueToColor(metaInfo.meta_text_color),
    fontSize: `${translateValueToSize(metaInfo.meta_font_size)}px`,
    fontStyle: translateValueToFontStyle(metaInfo.meta_font_style),
    fontWeight: translateValueToFontWeight(metaInfo.meta_font_weight),
  });

  return (
    <div
      className={getWrapperClassName(metaInfo)}
      style={getWrapperPureStyle(metaInfo)}
    >
      <div
        className="preview-area mx-auto h-screen w-full max-w-md px-5 pt-3 transition-all"
        style={getPreviewAreaStyle(metaInfo)}
      >
        <div className={getPreviewAreaClassName(metaInfo)}>
          <Image
            className={
              "h-12 w-12 border border-gray-300 md:h-20 md:w-20" +
              `${!isCenterLayout ? " mt-1" : ""} ` +
              `${isRounded ? "rounded-full" : "rounded-md"}`
            }
            src={metaInfo?.avatar || "/u2.png"}
            alt="avatar"
            width="50"
            height="50"
          />
          <div className={`${isCenterLayout ? "text-center" : ""}`}>
            <p className="mb-2 align-top text-2xl md:text-3xl">
              {metaInfo.nickname}
            </p>
            <ReactMarkdown className="line-clamp-3 w-72 text-xs opacity-70 md:text-sm">
              {metaInfo.describtion}
            </ReactMarkdown>
          </div>
        </div>
        <div className="widget mt-3">1okk</div>

        {/* <PlaceHolder /> */}
      </div>

      <UserFooter />
    </div>
  );
}
