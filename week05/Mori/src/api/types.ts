export type ApiEnvelope<T> = {
  status: boolean
  statusCode: number
  message: string
  data: T
}

export type SignInData = {
  id: number
  name: string
  accessToken: string
  refreshToken: string
}

export type SignUpData = {
  id: number
  name: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string
  updatedAt: string
}
