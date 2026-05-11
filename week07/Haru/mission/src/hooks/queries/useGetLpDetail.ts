
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp.ts"; // 상세 조회 API가 있다고 가정
import { QUERY_KEY } from "../../constans/key.ts";

function useGetLpDetail(lpid: string) {
  return useQuery({

    queryKey: [QUERY_KEY.lp, lpid], 
    queryFn: () => getLpDetail(lpid),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!lpid, 
  });
}

export default useGetLpDetail;