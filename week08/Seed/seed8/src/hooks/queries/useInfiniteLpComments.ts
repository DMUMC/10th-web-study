import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";

interface UseInfiniteLpCommentsParams {
  lpId: number;
  order?: PAGINATION_ORDER;
  limit?: number;
}

function useInfiniteLpComments({
  lpId,
  order = PAGINATION_ORDER.desc,
  limit = 10,
}: UseInfiniteLpCommentsParams) {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam }) =>
      getLpComments({
        lpId,
        cursor: pageParam as number,
        limit,
        order,
      }).then((res) => {
        console.log("댓글 응답: ", res.data.data[0]);
        return res;
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
    enabled: !!lpId,
  });
}

export default useInfiniteLpComments;
