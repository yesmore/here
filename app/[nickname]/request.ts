import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { UserStory } from "@/lib/types/story";

export function useStoryByNickname(nickname: string) {
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

export function useStoryByEmail(email: string) {
  let api = `/api/story`;
  const { data, error, isLoading } = useSWR<UserStory>(api, () =>
    fetcher(api, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        type: "get-by-email",
      }),
    }),
  );

  return {
    story: data,
    isLoading,
    isError: error,
  };
}
