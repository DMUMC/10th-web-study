import axios from 'axios'
import { apiClient, getAxiosErrorMessage } from './client'
import type { GetLpsResponse } from './types'

export type GetLpsParams = {
  cursor?: number
  limit?: number
  search?: string
  order?: 'asc' | 'desc'
}

export async function getLps(params: GetLpsParams = {}): Promise<GetLpsResponse> {
  try {
    const { data } = await apiClient.get<GetLpsResponse>('/v1/lps', { params })
    if (!data.status) {
      throw new Error(data.message || 'LP 목록을 불러오지 못했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, 'LP 목록을 불러오지 못했습니다.'))
  }
}

