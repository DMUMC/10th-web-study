import type { StoredUser } from './tokens'

export const stringTokenAdapter = {
  serialize: (value: string | null): string | null =>
    value === null || value === '' ? null : value,
  deserialize: (raw: string | null): string | null => raw,
} as const

export const storedUserAdapter = {
  serialize: (value: StoredUser | null): string | null =>
    value === null ? null : JSON.stringify(value),
  deserialize: (raw: string | null): StoredUser | null => {
    if (raw === null) return null
    try {
      const o = JSON.parse(raw) as unknown
      if (
        o &&
        typeof o === 'object' &&
        'id' in o &&
        'name' in o &&
        typeof (o as { id: unknown }).id === 'number' &&
        typeof (o as { name: unknown }).name === 'string'
      ) {
        return { id: (o as StoredUser).id, name: (o as StoredUser).name }
      }
      return null
    } catch {
      return null
    }
  },
} as const
