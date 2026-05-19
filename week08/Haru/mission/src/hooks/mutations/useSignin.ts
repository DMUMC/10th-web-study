import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { RequestSigninDto } from '../../types/auth'

export const useSignin = (redirectTo: string = '/') => {
    const navigate = useNavigate()
    const { login } = useAuth()

    return useMutation({
        mutationFn: (body: RequestSigninDto) => login(body),
        onSuccess: () => {
            navigate(redirectTo, { replace: true })
        },
        onError: (error: any) => {
            alert(error.response?.data?.message || '로그인 실패')
        }
    })
}