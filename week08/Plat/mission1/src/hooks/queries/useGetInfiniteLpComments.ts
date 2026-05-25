import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpCommentList } from "../../apis/comment.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type { PAGINATION_ORDER } from "../../enums/common.ts";

type UseGetInfiniteLpCommentsParams = {
  lpId?: string;
  order: PAGINATION_ORDER;
  limit?: number;
};

function useGetInfiniteLpComments({
  lpId,
  order,
  limit = 10,
}: UseGetInfiniteLpCommentsParams) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, lpId, order],
    initialPageParam: 0,
    enabled: !!lpId,
    queryFn: ({ pageParam }) =>
      getLpCommentList({
        lpId: Number(lpId),
        cursor: pageParam === 0 ? undefined : pageParam,
        limit,
        order,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) {
        return undefined;
      }

      return lastPage.data.nextCursor ?? undefined;
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
}

export default useGetInfiniteLpComments;