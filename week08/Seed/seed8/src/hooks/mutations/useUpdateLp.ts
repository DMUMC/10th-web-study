import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";

function useUpdateLp(lpId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateLp,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lp", lpId],
            });
        },
    });
}

export default useUpdateLp;