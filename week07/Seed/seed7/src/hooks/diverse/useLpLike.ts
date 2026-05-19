import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postLpLike, deleteLpLike } from '../../apis/lp'
import { QUERY_KEY } from '../../constans/key'

export const useLpLike = (lpId: string) => {
    const queryClient = useQueryClient()
    const lpIdNumber = Number(lpId)

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp] })
    }

    const like = useMutation({
        mutationFn: () => postLpLike(lpIdNumber),
        onSuccess: invalidate
    })

    const unlike = useMutation({
        mutationFn: () => deleteLpLike(lpIdNumber),
        onSuccess: invalidate
    })

    return { like, unlike }
}