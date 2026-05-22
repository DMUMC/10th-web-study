import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getGoogleCallback } from '../api/auth'
import { useAuth } from '../hooks/useAuth'

function getQueryValue(
  params: URLSearchParams,
  keys: readonly string[],
): string | null {
  for (const key of keys) {
    const value = params.get(key)
    if (value) return value
  }
  return null
}

export function GoogleCallbackPage() {
  const navigate = useNavigate()
  const { loginWithTokens } = useAuth()
  const params = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  )

  useEffect(() => {
    let active = true

    async function finishGoogleLogin() {
      try {
        const accessToken = getQueryValue(params, ['accessToken', 'access_token'])
        const refreshToken = getQueryValue(params, [
          'refreshToken',
          'refresh_token',
        ])
        const name = getQueryValue(params, ['name', 'nickname']) ?? 'Google User'
        const id = Number(getQueryValue(params, ['id', 'userId']) ?? 0)

        if (accessToken && refreshToken) {
          loginWithTokens({
            accessToken,
            refreshToken,
            user: { id: Number.isFinite(id) ? id : 0, name },
          })
          if (active) navigate('/', { replace: true })
          return
        }

        const code = params.get('code')
        if (!code) {
          throw new Error('구글 인증 코드가 없습니다.')
        }

        const state = params.get('state') ?? undefined
        const json = await getGoogleCallback({ code, state })
        const data = json.data
        loginWithTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: { id: data.id, name: data.name },
        })
        if (active) navigate('/', { replace: true })
      } catch (err) {
        if (active) {
          const message =
            err instanceof Error ? err.message : '구글 로그인에 실패했습니다.'
          navigate('/login', { replace: true, state: { oauthError: message } })
        }
      }
    }

    void finishGoogleLogin()

    return () => {
      active = false
    }
  }, [loginWithTokens, navigate, params])

  return (
    <main className="flex min-h-0 flex-1 items-center justify-center bg-black px-4 py-10">
      <p className="text-sm text-zinc-300">구글 로그인 처리 중...</p>
    </main>
  )
}
