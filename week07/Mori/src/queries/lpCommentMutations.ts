import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment, deleteComment, updateComment } from '../api/lps'
import type { LpCommentsOrder } from './lpComments'

export function lpCommentsQueryKey(lpId: number, order?: LpCommentsOrder) {
  return order === undefined
    ? (['lpComments', lpId] as const)
    : (['lpComments', lpId, order] as const)
}

export function useCreateCommentMutation(lpId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content: string) => createComment(lpId, { content }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: lpCommentsQueryKey(lpId) })
    },
  })
}

export function useUpdateCommentMutation(lpId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateComment(lpId, commentId, { content }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: lpCommentsQueryKey(lpId) })
    },
  })
}

export function useDeleteCommentMutation(lpId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(lpId, commentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: lpCommentsQueryKey(lpId) })
    },
  })
}
