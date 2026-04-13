import type { StoredUser } from './tokens'
import { z } from 'zod'

const storedUserSchema = z.object({
  id: z.number(),
  name: z.string(),
})

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
      const parsed = storedUserSchema.safeParse(JSON.parse(raw) as unknown)
      return parsed.success ? parsed.data : null
    } catch {
      return null
    }
  },
} as const
