import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteLpComment,
  patchLpComment,
  postLpComment,
} from "../../apis/comment.ts";
import { QUERY_KEY } from "../../constants/key.ts";

const invalidateCommentQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
  lpId: number
) => {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEY.lpComments, String(lpId)],
  });
};

export const useCreateCommentMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLpComment,
    onSuccess: () => {
      invalidateCommentQueries(queryClient, lpId);
    },
  });
};

export const useUpdateCommentMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchLpComment,
    onSuccess: () => {
      invalidateCommentQueries(queryClient, lpId);
    },
  });
};

export const useDeleteCommentMutation = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLpComment,
    onSuccess: () => {
      invalidateCommentQueries(queryClient, lpId);
    },
  });
};
