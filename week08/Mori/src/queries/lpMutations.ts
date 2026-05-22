import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { deleteLp, updateLp } from '../api/lps'
import { uploadImage } from '../api/uploads'
import { lpDetailQueryKey } from './lpDetail'

export type UpdateLpInput = {
  lpId: number
  title: string
  content: string
  tags: string[]
  imageFile: File | null
  currentThumbnail: string | null
  published: boolean
}

export function useUpdateLpMutation(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      lpId,
      title,
      content,
      tags,
      imageFile,
      currentThumbnail,
      published,
    }: UpdateLpInput) => {
      const trimmedTitle = title.trim()
      const trimmedContent = content.trim()

      if (!trimmedTitle) {
        throw new Error('LP 이름을 입력해 주세요.')
      }
      if (!trimmedContent) {
        throw new Error('LP 내용을 입력해 주세요.')
      }

      let thumbnail = currentThumbnail
      if (imageFile) {
        const upload = await uploadImage(imageFile)
        thumbnail = upload.data.imageUrl
      }

      if (!thumbnail) {
        throw new Error('LP 사진이 필요합니다.')
      }

      return updateLp(lpId, {
        title: trimmedTitle,
        content: trimmedContent,
        thumbnail,
        tags,
        published,
      })
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['lps'] })
      void queryClient.invalidateQueries({ queryKey: lpDetailQueryKey(variables.lpId) })
      options?.onSuccess?.()
    },
  })
}

export function useDeleteLpMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (lpId: number) => deleteLp(lpId),
    onSuccess: (_data, lpId) => {
      void queryClient.invalidateQueries({ queryKey: ['lps'] })
      queryClient.removeQueries({ queryKey: lpDetailQueryKey(lpId) })
      navigate('/', { replace: true })
    },
  })
}
