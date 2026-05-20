import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpDetail(lpid?: string, enabled = true) {
  return useQuery({
    queryKey: [QUERY_KEY.lp, lpid],
    queryFn: () => getLpDetail(Number(lpid)),
    enabled: enabled && !!lpid,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (response) => response.data,
  });
}

export default useGetLpDetail;