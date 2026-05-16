import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth.ts";
import { QUERY_KEY } from "../../constants/key.ts";

export const useUpdateMyInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.my] });
    },
  });
};
