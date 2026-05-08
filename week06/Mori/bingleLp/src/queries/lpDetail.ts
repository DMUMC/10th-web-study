import { useQuery } from '@tanstack/react-query'
import { getLpDetail } from '../api/lps'

export function lpDetailQueryKey(lpId: number) {
  return ['lp', lpId] as const
}

export function useLpDetailQuery(lpId: number | null) {
  return useQuery({
    queryKey: lpId ? lpDetailQueryKey(lpId) : ['lp', 'none'],
    queryFn: () => {
      if (lpId === null) throw new Error('lpId가 올바르지 않습니다.')
      return getLpDetail(lpId)
    },
    enabled: lpId !== null,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  })
}

