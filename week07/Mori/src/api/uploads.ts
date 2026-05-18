import { getApiBaseUrl } from '../config/api'
import { STORAGE_KEYS } from '../lib/tokens'
import { refreshAccessToken } from './client'
import type { UploadImageResponse } from './types'

class UploadRequestError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function requestUpload(file: File, accessToken: string | null): Promise<UploadImageResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const headers: HeadersInit = {}
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  const response = await fetch(`${getApiBaseUrl()}/v1/uploads`, {
    method: 'POST',
    headers,
    body: formData,
  })

  const data = (await response.json()) as UploadImageResponse

  if (response.status === 401) {
    throw new UploadRequestError(data.message || 'Unauthorized', 401)
  }

  if (!response.ok || !data.status) {
    throw new UploadRequestError(
      data.message || `이미지 업로드에 실패했습니다. (${response.status})`,
      response.status,
    )
  }

  return data
}

export async function uploadImage(file: File): Promise<UploadImageResponse> {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS)

  try {
    return await requestUpload(file, accessToken)
  } catch (err) {
    if (
      err instanceof UploadRequestError &&
      err.status === 401 &&
      localStorage.getItem(STORAGE_KEYS.REFRESH)
    ) {
      const nextAccessToken = await refreshAccessToken()
      return requestUpload(file, nextAccessToken)
    }

    if (err instanceof Error) throw err
    throw new Error('이미지 업로드에 실패했습니다.')
  }
}
