import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp.ts";
import { PAGINATION_ORDER } from "../../enums/common.ts";

export const useGetLpComments = (lpId: string, order: PAGINATION_ORDER) => {
  return useInfiniteQuery({
   
    queryKey: ['lpComments', lpId, order],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getLpComments({
        lpId,
        cursor: pageParam as number,
        limit: 10,
        order,
      });
     
      return response.data; 
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
  });
};