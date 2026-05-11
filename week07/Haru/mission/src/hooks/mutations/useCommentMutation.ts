import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment, patchComment, deleteComment } from "../../apis/lp";

export const useCommentMutation = (lpId: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (content: string) => postComment({ lpId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) => 
      patchComment({ lpId, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment({ lpId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });

  return {
    createComment: createMutation.mutate,
    updateComment: updateMutation.mutate,
    deleteComment: removeMutation.mutate,
    isPending: createMutation.isPending || updateMutation.isPending || removeMutation.isPending,
  };
};