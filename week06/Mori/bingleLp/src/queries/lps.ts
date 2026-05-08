import { useQuery } from '@tanstack/react-query'
import { getLps, type GetLpsParams } from '../api/lps'

export function lpsQueryKey(params: GetLpsParams) {
  return ['lps', params] as const
}

export function useLpsQuery(params: GetLpsParams) {
  return useQuery({
    queryKey: lpsQueryKey(params),
    queryFn: () => getLps(params),
  })
}

