import { useInfiniteQuery } from '@tanstack/react-query'
import { getLpComments } from '../api/lps'
import { lpCommentsQueryKey } from './lpCommentMutations'

export type LpCommentsOrder = 'asc' | 'desc'

export function useLpCommentsInfiniteQuery(
  lpId: number | null,
  order: LpCommentsOrder,
) {
  return useInfiniteQuery({
    queryKey: lpId === null ? ['lpComments', null, order] : lpCommentsQueryKey(lpId, order),
    enabled: lpId !== null,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => {
      if (lpId === null) throw new Error('lpId가 올바르지 않습니다.')
      const cursor = typeof pageParam === 'number' ? pageParam : 0
      return getLpComments(lpId, { cursor, limit: 10, order })
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) return undefined
      return lastPage.data.nextCursor
    },
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  })
}

