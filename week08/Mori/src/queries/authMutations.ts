import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { postSignin, postSignout } from '../api/auth'
import { deleteMyAccount } from '../api/users'
import { useAuth } from '../hooks/useAuth'
import { STORAGE_KEYS } from '../lib/tokens'

export function useLoginMutation() {
  const navigate = useNavigate()
  const { loginWithTokens } = useAuth()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postSignin({ email, password }),
    onSuccess: (response) => {
      const data = response.data
      if (!data?.accessToken || !data?.refreshToken) {
        throw new Error(response.message || '로그인 응답이 올바르지 않습니다.')
      }

      loginWithTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: { id: data.id, name: data.name },
      })
      navigate('/', { replace: true })
    },
  })
}

export function useLogoutMutation() {
  const navigate = useNavigate()
  const { clearSession } = useAuth()

  return useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS)
      if (token) await postSignout(token)
    },
    onSuccess: () => {
      clearSession()
      navigate('/', { replace: true })
    },
  })
}

export function useDeleteAccountMutation() {
  const navigate = useNavigate()
  const { clearSession } = useAuth()

  return useMutation({
    mutationFn: () => deleteMyAccount(),
    onSuccess: () => {
      clearSession()
      navigate('/login', { replace: true })
    },
  })
}
