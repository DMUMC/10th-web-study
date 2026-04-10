export const STORAGE_KEYS = {
  ACCESS: 'binglelp_access_token',
  REFRESH: 'binglelp_refresh_token',
  USER: 'binglelp_user',
} as const

export type StoredUser = { id: number; name: string }

export function clearAuthStorage() {
  localStorage.removeItem(STORAGE_KEYS.ACCESS)
  localStorage.removeItem(STORAGE_KEYS.REFRESH)
  localStorage.removeItem(STORAGE_KEYS.USER)
}
