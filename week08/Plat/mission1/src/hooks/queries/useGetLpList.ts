import { useQuery } from "@tanstack/react-query";
import { type PaginationDto } from "../../types/common.ts";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpList({ cursor, limit, search, order }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, order, search, cursor, limit],
    queryFn: () =>
      getLpList({
        cursor,
        limit,
        search,
        order,
      }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (response) => response.data.data,
  });
}

export default useGetLpList;