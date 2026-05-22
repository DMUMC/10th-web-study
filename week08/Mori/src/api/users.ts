import axios from 'axios'
import { apiClient, getAxiosErrorMessage } from './client'
import type {
  DeleteUserResponse,
  GetMyProfileResponse,
  UpdateUserPayload,
  UpdateUserResponse,
} from './types'

export async function getMyProfile(): Promise<GetMyProfileResponse> {
  try {
    const { data } = await apiClient.get<GetMyProfileResponse>('/v1/users/me')
    if (!data.status) {
      throw new Error(data.message || '프로필을 불러오지 못했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, '프로필을 불러오지 못했습니다.'))
  }
}

export async function deleteMyAccount(): Promise<DeleteUserResponse> {
  try {
    const { data } = await apiClient.delete<DeleteUserResponse>('/v1/users')
    if (!data.status) {
      throw new Error(data.message || '회원 탈퇴에 실패했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, '회원 탈퇴에 실패했습니다.'))
  }
}

export async function updateMyProfile(payload: UpdateUserPayload): Promise<UpdateUserResponse> {
  try {
    const { data } = await apiClient.patch<UpdateUserResponse>('/v1/users', payload)
    if (!data.status) {
      throw new Error(data.message || '프로필 수정에 실패했습니다.')
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, '프로필 수정에 실패했습니다.'))
  }
}
