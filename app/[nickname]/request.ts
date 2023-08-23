import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { UserStory } from "@/lib/types/story";

export function useStoryByNicename(nickname: string) {
  let api = `/api/story`;
  const { data, error, isLoading } = useSWR<UserStory>(api, () =>
    fetcher(api, {
      method: "POST",
      body: JSON.stringify({
        nickname: nickname,
        type: "get-by-nickname",
      }),
    }),
  );

  return {
    story: data,
    isLoading,
    isError: error,
  };
}
