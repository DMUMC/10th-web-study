import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLp } from '../api/lps'
import { uploadImage } from '../api/uploads'

export type CreateLpInput = {
  title: string
  content: string
  tags: string[]
  imageFile: File
}

export function useCreateLpMutation(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ title, content, tags, imageFile }: CreateLpInput) => {
      const upload = await uploadImage(imageFile)
      return createLp({
        title,
        content,
        thumbnail: upload.data.imageUrl,
        tags,
        published: true,
      })
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['lps'] })
      options?.onSuccess?.()
    },
  })
}
