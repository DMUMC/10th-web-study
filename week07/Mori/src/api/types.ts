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

export interface CreateLpPayload {
  title: string
  content: string
  thumbnail: string
  tags: string[]
  published: boolean
}

export interface CreatedLp {
  id: number
  title: string
  content: string
  thumbnail: string
  published: boolean
  authorId: number
  createdAt: string
  updatedAt: string
}

export type CreateLpResponse = ApiEnvelope<CreatedLp>

export interface UploadImageData {
  imageUrl: string
}

export type UploadImageResponse = ApiEnvelope<UploadImageData>

export type GetLpDetailResponse = ApiEnvelope<LpDetail>

export interface LpComment {
  id: number
  content: string
  lpId: number
  authorId: number
  createdAt: string
  updatedAt: string
  author: LpAuthor
}

export type GetLpCommentsResponse = ApiEnvelope<CursorPagination<LpComment>>

export type CreateCommentPayload = {
  content: string
}

export type UpdateCommentPayload = {
  content: string
}

export type CreateCommentResponse = ApiEnvelope<LpComment>
export type UpdateCommentResponse = ApiEnvelope<LpComment>
export type DeleteCommentResponse = ApiEnvelope<{ message: string }>

export interface UserProfile {
  id: number
  name: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string
  updatedAt: string
}

export type GetMyProfileResponse = ApiEnvelope<UserProfile>

export interface UpdateUserPayload {
  name: string
  bio: string | null
  avatar: string | null
}

export type UpdateUserResponse = ApiEnvelope<UserProfile>

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
