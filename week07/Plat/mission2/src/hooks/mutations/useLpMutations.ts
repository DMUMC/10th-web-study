import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteLpById,
  deleteLpLike,
  patchLp,
  postLp,
  postLpLike,
} from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type { ResponseLpDetailDto } from "../../types/lp.ts";

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

export const useLikeLpMutation = (lpId: number, userId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLpLike,
    onMutate: async (targetLpId: number) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lp, String(targetLpId)],
      });

      const previousLp = queryClient.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lp,
        String(targetLpId),
      ]);

      if (userId) {
        queryClient.setQueryData<ResponseLpDetailDto>(
          [QUERY_KEY.lp, String(targetLpId)],
          (old) => {
            if (!old) return old;

            const alreadyLiked = old.data.likes.some(
              (like) => like.userId === userId
            );

            if (alreadyLiked) return old;

            return {
              ...old,
              data: {
                ...old.data,
                likes: [
                  ...old.data.likes,
                  {
                    id: -Date.now(),
                    userId,
                    lpId: targetLpId,
                  },
                ],
              },
            };
          }
        );
      }

      return { previousLp };
    },
    onError: (_error, targetLpId, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(
          [QUERY_KEY.lp, String(targetLpId)],
          context.previousLp
        );
      }
    },
    onSettled: () => {
      invalidateLpQueries(queryClient, lpId);
    },
  });
};

export const useUnlikeLpMutation = (lpId: number, userId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLpLike,
    onMutate: async (targetLpId: number) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lp, String(targetLpId)],
      });

      const previousLp = queryClient.getQueryData<ResponseLpDetailDto>([
        QUERY_KEY.lp,
        String(targetLpId),
      ]);

      if (userId) {
        queryClient.setQueryData<ResponseLpDetailDto>(
          [QUERY_KEY.lp, String(targetLpId)],
          (old) => {
            if (!old) return old;

            return {
              ...old,
              data: {
                ...old.data,
                likes: old.data.likes.filter((like) => like.userId !== userId),
              },
            };
          }
        );
      }

      return { previousLp };
    },
    onError: (_error, targetLpId, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(
          [QUERY_KEY.lp, String(targetLpId)],
          context.previousLp
        );
      }
    },
    onSettled: () => {
      invalidateLpQueries(queryClient, lpId);
    },
  });
};
