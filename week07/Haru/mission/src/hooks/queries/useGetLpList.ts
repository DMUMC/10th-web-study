import { useQuery } from "@tanstack/react-query";
import { type PaginationDto } from "../../types/common.ts";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constans/key.ts";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({

    queryKey: [QUERY_KEY.lps, order, search], 
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),

    
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,   

   
  });
}

export default useGetLpList;