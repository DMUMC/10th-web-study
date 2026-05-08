import axios from 'axios'
import { apiClient, getAxiosErrorMessage } from './client'
import type { GetLpDetailResponse, GetLpsResponse } from './types'

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

export async function getLpDetail(lpId: number): Promise<GetLpDetailResponse> {
  try {
    const { data } = await apiClient.get<GetLpDetailResponse>(`/v1/lps/${lpId}`)
    if (!data.status) {
      throw new Error(data.message || 'LP 상세를 불러오지 못했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, 'LP 상세를 불러오지 못했습니다.'))
  }
}

