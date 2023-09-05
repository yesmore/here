import { UserStory } from "@/lib/types/story";
import {
  layoutValueMappings,
  translateValueToColor,
  translateValueToFontStyle,
  translateValueToFontWeight,
  translateValueToSize,
} from "@/pages/workspace/enum";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import UserFooter from "../layout/user-footer";

export default function MainView({ metaInfo }: { metaInfo: UserStory }) {
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
        : "flex-row items-start justify-start gap-3";

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
    <div className="preview-main">
      <div
        className="preview-area mx-auto h-screen w-full max-w-md px-5 pt-3 transition-all"
        style={getPreviewAreaStyle(metaInfo)}
      >
        <div className={getPreviewAreaClassName(metaInfo)}>
          <Image
            src={metaInfo?.avatar ?? ""}
            alt="avatar"
            width="50"
            height="50"
            className="h-12 w-12 rounded-full border border-gray-300 md:h-20 md:w-20"
          />
          <div
            className={` ${
              layoutValueMappings[metaInfo.meta_layout] === "center"
                ? "text-center"
                : ""
            } `}
          >
            <p className="text-2xl md:text-3xl">{metaInfo.nickname}</p>
            <ReactMarkdown className=" line-clamp-3 w-72 text-xs opacity-70 md:text-sm">
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
