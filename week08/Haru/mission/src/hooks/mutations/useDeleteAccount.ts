import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../apis/axios'
import { useAuth } from '../../context/AuthContext'

const deleteAccount = async () => {
    const { data } = await axiosInstance.delete('/v1/users')
    return data
}

export const useDeleteAccount = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            logout()
            navigate('/login', { replace: true })
        },
        onError: (error: any) => {
            alert(error.response?.data?.message || '탈퇴 처리 실패')
        }
    })
}