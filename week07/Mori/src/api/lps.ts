import axios from 'axios'
import { apiClient, getAxiosErrorMessage } from './client'
import type {
  CreateLpPayload,
  CreateLpResponse,
  GetLpCommentsResponse,
  GetLpDetailResponse,
  GetLpsResponse,
} from './types'

export type GetLpsParams = {
  cursor?: number
  limit?: number
  search?: string
  order?: 'asc' | 'desc'
}

export async function createLp(payload: CreateLpPayload): Promise<CreateLpResponse> {
  try {
    const { data } = await apiClient.post<CreateLpResponse>('/v1/lps', payload)
    if (!data.status) {
      throw new Error(data.message || 'LP 생성에 실패했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, 'LP 생성에 실패했습니다.'))
  }
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

export type GetLpCommentsParams = {
  cursor?: number
  limit?: number
  order?: 'asc' | 'desc'
}

export async function getLpComments(
  lpId: number,
  params: GetLpCommentsParams = {},
): Promise<GetLpCommentsResponse> {
  try {
    const { data } = await apiClient.get<GetLpCommentsResponse>(
      `/v1/lps/${lpId}/comments`,
      { params },
    )
    if (!data.status) {
      throw new Error(data.message || '댓글을 불러오지 못했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, '댓글을 불러오지 못했습니다.'))
  }
}

