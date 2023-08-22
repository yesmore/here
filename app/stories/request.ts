import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { UserStory } from "@/lib/types/story";

export function useStories() {
  let api = `/api/story`;
  const { data, error, isLoading } = useSWR<[UserStory]>(api, () =>
    fetcher(api, { method: "GET" }),
  );

  return {
    stories: data,
    isLoading,
    isError: error,
  };
}
