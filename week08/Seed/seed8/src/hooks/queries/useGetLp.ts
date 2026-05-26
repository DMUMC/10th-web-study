import { useQuery } from "@tanstack/react-query";
import { getLp } from "../../apis/lp";

function useGetLp(lpId: number) {
    return useQuery({
        queryKey: ["lp", lpId],
        queryFn: () => getLp(lpId),
        enabled: !!lpId,
    });
}

export default useGetLp;