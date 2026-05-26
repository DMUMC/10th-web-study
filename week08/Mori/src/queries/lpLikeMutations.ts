import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeLp, unlikeLp } from '../api/lps'
import type { GetLpDetailResponse } from '../api/types'
import { useAuth } from '../hooks/useAuth'
import { lpDetailQueryKey } from './lpDetail'

export type ToggleLpLikeInput = {
  action: 'like' | 'unlike'
}

type LikeMutationContext = {
  previous: GetLpDetailResponse | undefined
}

export function useToggleLpLikeMutation(lpId: number) {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const queryKey = lpDetailQueryKey(lpId)

  return useMutation({
    mutationFn: async ({ action }: ToggleLpLikeInput) => {
      if (!user) {
        throw new Error('로그인이 필요합니다.')
      }
      if (action === 'like') {
        return likeLp(lpId)
      }
      await unlikeLp(lpId)
    },
    onMutate: async ({ action }): Promise<LikeMutationContext | undefined> => {
      if (!user) return undefined

      await queryClient.cancelQueries({ queryKey })

      const previous = queryClient.getQueryData<GetLpDetailResponse>(queryKey)
      if (!previous) return { previous }

      const newLikes =
        action === 'like'
          ? previous.data.likes.some((like) => like.userId === user.id)
            ? previous.data.likes
            : [...previous.data.likes, { id: -1, userId: user.id, lpId }]
          : previous.data.likes.filter((like) => like.userId !== user.id)

      queryClient.setQueryData<GetLpDetailResponse>(queryKey, {
        ...previous,
        data: {
          ...previous.data,
          likes: newLikes,
        },
      })

      return { previous }
    },
    onSuccess: (response, { action }) => {
      if (action !== 'like' || !response?.data) return

      queryClient.setQueryData<GetLpDetailResponse>(queryKey, (current) => {
        if (!current) return current

        const withoutTemp = current.data.likes.filter(
          (like) => !(like.id === -1 && like.userId === user?.id),
        )
        const alreadyHas = withoutTemp.some((like) => like.id === response.data.id)
        const likes = alreadyHas
          ? withoutTemp
          : [...withoutTemp, response.data]

        return {
          ...current,
          data: {
            ...current.data,
            likes,
          },
        }
      })
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous)
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey })
      void queryClient.invalidateQueries({ queryKey: ['lps'] })
    },
  })
}
