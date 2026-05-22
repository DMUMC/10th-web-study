import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyProfile, updateMyProfile } from '../api/users'
import { uploadImage } from '../api/uploads'
import type { GetMyProfileResponse, UpdateUserPayload } from '../api/types'
import { useAuth } from '../hooks/useAuth'
import type { StoredUser } from '../lib/tokens'

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
  optimisticAvatar: string | null
}

type ProfileMutationContext = {
  previousProfile: GetMyProfileResponse | undefined
  previousStoredUser: StoredUser | null
}

export function useUpdateProfileMutation(options?: {
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()
  const { user, updateStoredUser } = useAuth()

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
    onMutate: async (variables): Promise<ProfileMutationContext> => {
      await queryClient.cancelQueries({ queryKey: myProfileQueryKey })

      const previousProfile = queryClient.getQueryData<GetMyProfileResponse>(
        myProfileQueryKey,
      )
      const previousStoredUser = user

      const trimmedName = variables.name.trim()
      const trimmedBio = variables.bio.trim() === '' ? null : variables.bio.trim()

      if (previousProfile && trimmedName) {
        queryClient.setQueryData<GetMyProfileResponse>(myProfileQueryKey, {
          ...previousProfile,
          data: {
            ...previousProfile.data,
            name: trimmedName,
            bio: trimmedBio,
            avatar: variables.optimisticAvatar ?? previousProfile.data.avatar,
          },
        })
      }

      if (user && trimmedName) {
        updateStoredUser({ id: user.id, name: trimmedName })
      }

      return { previousProfile, previousStoredUser }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(myProfileQueryKey, context.previousProfile)
      }
      if (context?.previousStoredUser) {
        updateStoredUser(context.previousStoredUser)
      }
    },
    onSuccess: (profile) => {
      queryClient.setQueryData<GetMyProfileResponse>(myProfileQueryKey, (old) =>
        old
          ? {
              ...old,
              data: profile,
            }
          : {
              status: true,
              statusCode: 200,
              message: '',
              data: profile,
            },
      )
      options?.onSuccess?.()
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: myProfileQueryKey })
    },
  })
}
