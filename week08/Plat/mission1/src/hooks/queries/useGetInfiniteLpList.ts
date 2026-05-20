import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type { PAGINATION_ORDER } from "../../enums/common.ts";

type UseGetInfiniteLpListParams = {
  order: PAGINATION_ORDER;
  limit?: number;
  search?: string;
  enabled?: boolean;
};

function useGetInfiniteLpList({
  order,
  limit = 10,
  search,
  enabled = true,
}: UseGetInfiniteLpListParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, "search", search ?? "", "order", order],
    initialPageParam: 0,
    enabled,
    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam === 0 ? undefined : pageParam,
        limit,
        search,
        order,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) {
        return undefined;
      }

      return lastPage.data.nextCursor ?? undefined;
    },
    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetInfiniteLpList;
