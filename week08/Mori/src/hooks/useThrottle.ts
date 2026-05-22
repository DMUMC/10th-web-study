import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRanAtRef = useRef(0)
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const latestValueRef = useRef(value)

  useEffect(() => {
    latestValueRef.current = value

    const apply = () => {
      lastRanAtRef.current = Date.now()
      setThrottledValue(latestValueRef.current)
      timeoutIdRef.current = null
    }

    const now = Date.now()
    const elapsed = lastRanAtRef.current === 0 ? interval : now - lastRanAtRef.current

    if (elapsed >= interval) {
      apply()
    } else if (timeoutIdRef.current === null) {
      timeoutIdRef.current = window.setTimeout(apply, interval - elapsed)
    }

    return () => {
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
    }
  }, [value, interval])

  return throttledValue
}
