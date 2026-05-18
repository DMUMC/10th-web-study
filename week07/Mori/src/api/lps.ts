import axios from 'axios'
import { apiClient, getAxiosErrorMessage } from './client'
import type {
  CreateCommentPayload,
  CreateCommentResponse,
  CreateLpPayload,
  CreateLpResponse,
  DeleteCommentResponse,
  DeleteLpResponse,
  GetLpCommentsResponse,
  GetLpDetailResponse,
  GetLpsResponse,
  UpdateCommentPayload,
  UpdateCommentResponse,
  UpdateLpPayload,
  UpdateLpResponse,
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

export async function updateLp(
  lpId: number,
  payload: UpdateLpPayload,
): Promise<UpdateLpResponse> {
  try {
    const { data } = await apiClient.patch<UpdateLpResponse>(`/v1/lps/${lpId}`, payload)
    if (!data.status) {
      throw new Error(data.message || 'LP 수정에 실패했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, 'LP 수정에 실패했습니다.'))
  }
}

export async function deleteLp(lpId: number): Promise<DeleteLpResponse> {
  try {
    const { data } = await apiClient.delete<DeleteLpResponse>(`/v1/lps/${lpId}`)
    if (!data.status) {
      throw new Error(data.message || 'LP 삭제에 실패했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, 'LP 삭제에 실패했습니다.'))
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

export async function createComment(
  lpId: number,
  payload: CreateCommentPayload,
): Promise<CreateCommentResponse> {
  try {
    const { data } = await apiClient.post<CreateCommentResponse>(
      `/v1/lps/${lpId}/comments`,
      payload,
    )
    if (!data.status) {
      throw new Error(data.message || '댓글 등록에 실패했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, '댓글 등록에 실패했습니다.'))
  }
}

export async function updateComment(
  lpId: number,
  commentId: number,
  payload: UpdateCommentPayload,
): Promise<UpdateCommentResponse> {
  try {
    const { data } = await apiClient.patch<UpdateCommentResponse>(
      `/v1/lps/${lpId}/comments/${commentId}`,
      payload,
    )
    if (!data.status) {
      throw new Error(data.message || '댓글 수정에 실패했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, '댓글 수정에 실패했습니다.'))
  }
}

export async function deleteComment(
  lpId: number,
  commentId: number,
): Promise<DeleteCommentResponse> {
  try {
    const { data } = await apiClient.delete<DeleteCommentResponse>(
      `/v1/lps/${lpId}/comments/${commentId}`,
    )
    if (!data.status) {
      throw new Error(data.message || '댓글 삭제에 실패했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, '댓글 삭제에 실패했습니다.'))
  }
}

