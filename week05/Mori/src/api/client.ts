import axios from 'axios'
import { getApiBaseUrl } from '../config/api'

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
})

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
