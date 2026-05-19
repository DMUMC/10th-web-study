import axios from 'axios'
import { getApiBaseUrl } from '../config/api'
import { apiClient, getAxiosErrorMessage } from './client'
import type { ApiEnvelope, SignInData, SignUpData } from './types'

export function getGoogleLoginUrl(): string {
  return `${getApiBaseUrl()}/v1/auth/google/login`
}

async function requestAuth<T>(
  path: string,
  body: unknown,
  fallbackMessage: string,
): Promise<ApiEnvelope<T>> {
  try {
    const { data } = await apiClient.post<ApiEnvelope<T>>(path, body)
    if (!data.status) {
      throw new Error(data.message || fallbackMessage)
    }
    return data
  } catch (err) {
    if (err instanceof Error && !axios.isAxiosError(err)) throw err
    throw new Error(getAxiosErrorMessage(err, fallbackMessage))
  }
}

export async function postSignin(body: {
  email: string
  password: string
}): Promise<ApiEnvelope<SignInData>> {
  return requestAuth<SignInData>('/v1/auth/signin', body, '로그인에 실패했습니다.')
}

export async function postSignup(body: {
  nickname: string
  email: string
  password: string
  bio?: string
  avatar?: string
}): Promise<ApiEnvelope<SignUpData>> {
  return requestAuth<SignUpData>(
    '/v1/auth/signup',
    { ...body, name: body.nickname },
    '회원가입에 실패했습니다.',
  )
}

export async function postSignout(accessToken: string): Promise<void> {
  try {
    await apiClient.post(
      '/v1/auth/signout',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
  } catch (err) {
    throw new Error(getAxiosErrorMessage(err, '로그아웃에 실패했습니다.'))
  }
}
