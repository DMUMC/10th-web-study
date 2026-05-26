import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constans/key";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEY.userMe],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5,
  });
};