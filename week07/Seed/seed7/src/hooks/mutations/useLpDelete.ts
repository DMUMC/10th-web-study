import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../apis/axios'

const deleteLp = async (lpId: number) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`)
    return data
}

export const useLpDelete = (lpId: string) => {
    const navigate = useNavigate()
    const lpIdNumber = Number(lpId)

    return useMutation({
        mutationFn: () => deleteLp(lpIdNumber),
        onSuccess: () => navigate('/', { replace: true }),
        onError: (error: any) => alert(error.response?.data?.message || '삭제 실패')
    })
}