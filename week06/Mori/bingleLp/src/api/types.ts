export type ApiEnvelope<T> = {
  status: boolean
  statusCode: number
  message: string
  data: T
}

export interface LpTag {
  id: number
  name: string
}

export interface LpLike {
  id: number
  userId: number
  lpId: number
}

export interface LpItem {
  id: number
  title: string
  content: string
  thumbnail: string
  published: boolean
  authorId: number
  createdAt: string
  updatedAt: string
  tags: LpTag[]
  likes: LpLike[]
}

export interface LpAuthor {
  id: number
  name: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string
  updatedAt: string
}

export interface LpDetail extends LpItem {
  author: LpAuthor
}

export interface CursorPagination<TItem> {
  data: TItem[]
  nextCursor: number
  hasNext: boolean
}

export type GetLpsResponse = ApiEnvelope<CursorPagination<LpItem>>

export type GetLpDetailResponse = ApiEnvelope<LpDetail>

export interface SignInData {
  id: number
  name: string
  accessToken: string
  refreshToken: string
}

export interface SignUpData {
  id: number
  name: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string
  updatedAt: string
}
