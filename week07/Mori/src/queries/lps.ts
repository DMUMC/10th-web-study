import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getLps, type GetLpsParams } from '../api/lps'

export type LpListSort = NonNullable<GetLpsParams['order']>

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
