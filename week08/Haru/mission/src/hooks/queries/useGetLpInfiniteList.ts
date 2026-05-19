import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constans/key";
import { type ResponseLpListDto } from "../../types/lp";

export const useGetLpInfiniteList = (order: PAGINATION_ORDER, search: string = "") => {
  const trimmedSearch = search.trim();

  return useInfiniteQuery<ResponseLpListDto["data"]>({
    queryKey: [QUERY_KEY.lps, order, trimmedSearch],
    
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getLpList({
        cursor: pageParam as number,
        limit: 10,
        order: order,
        search: trimmedSearch || undefined,
      });
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};