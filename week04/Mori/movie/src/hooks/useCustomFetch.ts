import { useEffect, useMemo, useState } from 'react'
import axios, { type AxiosRequestConfig } from 'axios'
import { apiClient } from '../util/AxiosInstance'

type UseCustomFetchResult<T> = {
  data: T | null
  isLoading: boolean
  error: string | null
}

type UseCustomFetchOptions<T> = {
  params?: AxiosRequestConfig['params']
  enabled?: boolean
  initialData?: T | null
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status

    if (status === 401 || status === 403) {
      return '인증에 실패했습니다. TMDB API 키를 확인해 주세요.'
    }
    if (status === 404) return '요청한 데이터를 찾을 수 없습니다.'
    if (status && status >= 500) {
      return '서버에 문제가 있어 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
    }

    return err.message || '요청 처리 중 문제가 발생했습니다.'
  }

  return err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
}

export function useCustomFetch<T>(
  url: string | null | undefined,
  options?: UseCustomFetchOptions<T>,
): UseCustomFetchResult<T> {
  const enabled = options?.enabled ?? true
  const params = options?.params

  const [data, setData] = useState<T | null>(options?.initialData ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const paramsKey = useMemo(() => {
    if (!params) return ''
    try {
      return JSON.stringify(params)
    } catch {
      return String(params)
    }
  }, [params])

  useEffect(() => {
    if (!enabled) return
    if (!url) return

    const controller = new AbortController()
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const res = await apiClient.get<T>(url, {
          params,
          signal: controller.signal,
        })
        if (!isMounted) return
        setData(res.data)
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === 'CanceledError') return
        if (!isMounted) return
        setError(getErrorMessage(err))
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, url, paramsKey])

  return { data, isLoading, error }
}
