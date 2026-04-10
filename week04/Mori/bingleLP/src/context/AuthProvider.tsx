import { useCallback, useLayoutEffect, useMemo } from 'react'
import {
  getGoogleLoginUrl,
  postSignin,
  postSignout,
  postSignup,
} from '../api/auth'
import { AuthContext } from './authContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  stringTokenAdapter,
  storedUserAdapter,
} from '../lib/authStorageAdapters'
import { clearAuthStorage, STORAGE_KEYS, type StoredUser } from '../lib/tokens'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    STORAGE_KEYS.ACCESS,
    null,
    stringTokenAdapter,
  )
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    STORAGE_KEYS.REFRESH,
    null,
    stringTokenAdapter,
  )
  const [storedUser, setStoredUser] = useLocalStorage<StoredUser | null>(
    STORAGE_KEYS.USER,
    null,
    storedUserAdapter,
  )

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const a = localStorage.getItem(STORAGE_KEYS.ACCESS)
    const r = localStorage.getItem(STORAGE_KEYS.REFRESH)
    const u = localStorage.getItem(STORAGE_KEYS.USER)
    const anySet = !!(a || r || u)
    const allSet = !!(a && r && u)
    if (anySet && !allSet) {
      clearAuthStorage()
      setAccessToken(null)
      setRefreshToken(null)
      setStoredUser(null)
    }
  }, [setAccessToken, setRefreshToken, setStoredUser])

  const login = useCallback(
    async (email: string, password: string) => {
      const json = await postSignin({ email, password })
      const d = json.data
      if (!d?.accessToken || !d?.refreshToken) {
        throw new Error(json.message || '로그인 응답이 올바르지 않습니다.')
      }
      setAccessToken(d.accessToken)
      setRefreshToken(d.refreshToken)
      const u: StoredUser = { id: d.id, name: d.name }
      setStoredUser(u)
    },
    [setAccessToken, setRefreshToken, setStoredUser],
  )

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      await postSignup({ name, email, password })
    },
    [],
  )

  const logout = useCallback(async () => {
    const t = accessToken
    if (t) await postSignout(t)
    setAccessToken(null)
    setRefreshToken(null)
    setStoredUser(null)
  }, [accessToken, setAccessToken, setRefreshToken, setStoredUser])

  const startGoogleLogin = useCallback(() => {
    window.location.href = getGoogleLoginUrl()
  }, [])

  const user = storedUser
  const ready = true
  const isAuthenticated =
    user !== null && accessToken !== null && refreshToken !== null

  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated,
      login,
      signup,
      logout,
      startGoogleLogin,
    }),
    [user, ready, isAuthenticated, login, signup, logout, startGoogleLogin],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
