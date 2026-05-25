import axios, { AxiosHeaders } from 'axios'
import { getApiBaseUrl } from '../config/api'
import { clearAuthStorage, STORAGE_KEYS } from '../lib/tokens'

type RetryableRequestConfig = {
  _retry?: boolean
}

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
})

let refreshPromise: Promise<string> | null = null
const NO_REFRESH_RETRY_PATHS = [
  '/v1/auth/signin',
  '/v1/auth/signup',
  '/v1/auth/refresh',
]

function getStoredAccessToken() {
  return localStorage.getItem(STORAGE_KEYS.ACCESS)
}

function getStoredRefreshToken() {
  return localStorage.getItem(STORAGE_KEYS.REFRESH)
}

function storeTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(STORAGE_KEYS.ACCESS, accessToken)
  localStorage.setItem(STORAGE_KEYS.REFRESH, refreshToken)
}

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getStoredRefreshToken()
  if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.')

  const { data } = await axios.post(
    `${getApiBaseUrl()}/v1/auth/refresh`,
    { refresh: refreshToken },
    { headers: { 'Content-Type': 'application/json' }, timeout: 30_000 },
  )

  const nextAccessToken = data?.data?.accessToken as string | undefined
  const nextRefreshToken =
    (data?.data?.refreshToken as string | undefined) ?? refreshToken

  if (!nextAccessToken) {
    throw new Error('토큰 재발급 응답이 올바르지 않습니다.')
  }

  storeTokens(nextAccessToken, nextRefreshToken)
  return nextAccessToken
}

apiClient.interceptors.request.use((config) => {
  const token = getStoredAccessToken()
  if (!token) return config

  const nextHeaders = AxiosHeaders.from(config.headers)
  nextHeaders.set('Authorization', `Bearer ${token}`)
  config.headers = nextHeaders
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error)

    const status = error.response?.status
    const originalRequest = error.config as (typeof error.config &
      RetryableRequestConfig) | null

    if (!originalRequest || status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    const requestUrl = originalRequest.url ?? ''
    const shouldSkipRefreshRetry = NO_REFRESH_RETRY_PATHS.some((path) =>
      requestUrl.includes(path),
    )

    if (shouldSkipRefreshRetry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken()
      }
      const nextAccessToken = await refreshPromise
      refreshPromise = null

      const nextHeaders = AxiosHeaders.from(originalRequest.headers)
      nextHeaders.set('Authorization', `Bearer ${nextAccessToken}`)
      originalRequest.headers = nextHeaders

      return apiClient(originalRequest)
    } catch (refreshError) {
      refreshPromise = null
      clearAuthStorage()
      return Promise.reject(refreshError)
    }
  },
)

export function getAxiosErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    if (err.message) return err.message
    if (err.response?.status) {
      return `${fallback} (${err.response.status})`
    }
  }
  if (err instanceof Error) return err.message
  return fallback
}
