import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getLps, type GetLpsParams } from '../api/lps'

export type LpListSort = NonNullable<GetLpsParams['order']>

export function lpsInfiniteQueryKey(sort: LpListSort, debouncedQuery: string) {
  return ['lps', sort, 'search', debouncedQuery] as const
}

export function lpsQueryKey(params: GetLpsParams) {
  const sort: LpListSort = params.order ?? 'desc'
  return [
    'lps',
    sort,
    {
      cursor: params.cursor ?? 0,
      limit: params.limit ?? 10,
      search: params.search ?? '',
    },
  ] as const
}

const LPS_STALE_TIME_MS = 60_000
const LPS_GC_TIME_MS = 10 * 60_000

export function useLpsQuery(params: GetLpsParams) {
  return useQuery({
    queryKey: lpsQueryKey(params),
    queryFn: () => getLps(params),
    staleTime: LPS_STALE_TIME_MS,
    gcTime: LPS_GC_TIME_MS,
    placeholderData: keepPreviousData,
  })
}

export function useLpsInfiniteQuery(sort: LpListSort, debouncedQuery: string, enabled: boolean) {
  const trimmedQuery = debouncedQuery.trim()

  return useInfiniteQuery({
    queryKey: lpsInfiniteQueryKey(sort, trimmedQuery),
    enabled,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => {
      const cursor = typeof pageParam === 'number' ? pageParam : 0
      const params: GetLpsParams = {
        cursor,
        limit: 10,
        order: sort,
        search: trimmedQuery || undefined,
      }
      return getLps(params)
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) return undefined
      return lastPage.data.nextCursor
    },
    staleTime: LPS_STALE_TIME_MS,
    gcTime: LPS_GC_TIME_MS,
  })
}
