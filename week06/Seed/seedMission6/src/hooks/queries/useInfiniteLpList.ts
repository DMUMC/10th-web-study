import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";

interface UseInfiniteLpListParams {
  search?: string;
  order?: PAGINATION_ORDER;
  limit?: number;
}

function useInfiniteLpList({
  search = "",
  order = PAGINATION_ORDER.desc,
  limit = 10,
}: UseInfiniteLpListParams = {}) {
  return useInfiniteQuery({
    queryKey: ["lps", order, search],
    queryFn: ({ pageParam }) =>
      getLpList({
        cursor: pageParam as number,
        limit,
        search,
        order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.nextCursor ?? undefined;
    },
  });
}

export default useInfiniteLpList;
