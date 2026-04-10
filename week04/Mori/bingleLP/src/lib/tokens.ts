export const STORAGE_KEYS = {
  ACCESS: 'binglelp_access_token',
  REFRESH: 'binglelp_refresh_token',
  USER: 'binglelp_user',
} as const

export type StoredUser = { id: number; name: string }

export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACCESS)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.REFRESH)
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem(STORAGE_KEYS.ACCESS, access)
  localStorage.setItem(STORAGE_KEYS.REFRESH, refresh)
}

export function setStoredUser(user: StoredUser) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export function getStoredUser(): StoredUser | null {
  const raw = localStorage.getItem(STORAGE_KEYS.USER)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredUser
  } catch {
    return null
  }
}

export function clearAuthStorage() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS)
  localStorage.removeItem(STORAGE_KEYS.REFRESH)
  localStorage.removeItem(STORAGE_KEYS.USER)
}
