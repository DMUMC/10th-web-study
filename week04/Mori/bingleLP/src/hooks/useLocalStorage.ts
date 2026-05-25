import { useCallback, useEffect, useState } from 'react'

type LocalStorageOptions<T> = {
  serialize: (value: T) => string | null
  deserialize: (raw: string | null) => T
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: LocalStorageOptions<T>,
): readonly [T, React.Dispatch<React.SetStateAction<T>>] {
  const { serialize, deserialize } = options

  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    return deserialize(localStorage.getItem(key))
  })

  const setValue = useCallback(
    (action: React.SetStateAction<T>) => {
      setState((prev) => {
        const next =
          typeof action === 'function'
            ? (action as (previous: T) => T)(prev)
            : action
        const serialized = serialize(next)
        if (serialized === null) localStorage.removeItem(key)
        else localStorage.setItem(key, serialized)
        return next
      })
    },
    [key, serialize],
  )

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== key) return
      setState(deserialize(localStorage.getItem(key)))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, deserialize])

  return [state, setValue] as const
}
