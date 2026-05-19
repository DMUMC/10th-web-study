import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyProfile, updateMyProfile } from '../api/users'
import { uploadImage } from '../api/uploads'
import type { UpdateUserPayload, UserProfile } from '../api/types'

export const myProfileQueryKey = ['myProfile'] as const

export function useMyProfileQuery(enabled = true) {
  return useQuery({
    queryKey: myProfileQueryKey,
    queryFn: () => getMyProfile(),
    enabled,
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  })
}

export type UpdateProfileInput = {
  name: string
  bio: string
  imageFile: File | null
  currentAvatar: string | null
}

export function useUpdateProfileMutation(options?: {
  onSuccess?: (profile: UserProfile) => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name, bio, imageFile, currentAvatar }: UpdateProfileInput) => {
      const trimmedName = name.trim()
      if (!trimmedName) {
        throw new Error('이름을 입력해 주세요.')
      }

      let avatar: string | null = currentAvatar
      if (imageFile) {
        const upload = await uploadImage(imageFile)
        avatar = upload.data.imageUrl
      }

      const payload: UpdateUserPayload = {
        name: trimmedName,
        bio: bio.trim() === '' ? null : bio.trim(),
        avatar,
      }

      const response = await updateMyProfile(payload)
      return response.data
    },
    onSuccess: (profile) => {
      void queryClient.invalidateQueries({ queryKey: myProfileQueryKey })
      options?.onSuccess?.(profile)
    },
  })
}
