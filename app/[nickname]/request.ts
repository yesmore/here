import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { UserStory } from "@/lib/types/story";

export function useStoryByNickname(nickname: string) {
  let api = `/api/story-name`;
  const { data, error, isLoading } = useSWR<UserStory>(api, () =>
    fetcher(api, {
      method: "POST",
      body: JSON.stringify({
        nickname: nickname,
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
  let api = `/api/story-email`;
  const { data, error, isLoading } = useSWR<UserStory>(api, () =>
    fetcher(api, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      // cache: "no-store",
    }),
  );

  return {
    story: data,
    isLoading,
    isError: error,
  };
}
