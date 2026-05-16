import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteLpById,
  deleteLpLike,
  patchLp,
  postLp,
  postLpLike,
} from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

const invalidateLpQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
  lpId?: number
) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });

  if (lpId) {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, String(lpId)] });
  }
};

export const useCreateLpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });
};

export const useUpdateLpMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLp,
    onSuccess: () => {
      invalidateLpQueries(queryClient, lpId);
    },
  });
};

export const useDeleteLpMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLpById,
    onSuccess: () => {
      invalidateLpQueries(queryClient, lpId);
    },
  });
};

export const useLikeLpMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLpLike,
    onSuccess: () => {
      invalidateLpQueries(queryClient, lpId);
    },
  });
};

export const useUnlikeLpMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLpLike,
    onSuccess: () => {
      invalidateLpQueries(queryClient, lpId);
    },
  });
};
