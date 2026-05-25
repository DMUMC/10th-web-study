import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLpList } from "../../apis/lp";

interface Props {
  order: string;
  search: string;
  limit: number;
}

export default function useInfiniteLpList({
  order,
  search,
  limit,
}: Props) {
  return useInfiniteQuery({
    queryKey: ["lps", order, search],

    queryFn: async ({ pageParam = null }) => {
      const response = await fetchLpList({
        cursor: pageParam,
        order,
        search,
        limit,
      });

      return response;
    },

    initialPageParam: null,

    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },

    enabled: search.trim() !== "",

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}