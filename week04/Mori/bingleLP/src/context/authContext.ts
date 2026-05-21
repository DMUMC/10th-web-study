import { createContext } from 'react'
import type { StoredUser } from '../lib/tokens'

export type AuthContextValue = {
  user: StoredUser | null
  ready: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (payload: {
    nickname: string
    email: string
    password: string
  }) => Promise<void>
  logout: () => Promise<void>
  startGoogleLogin: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
