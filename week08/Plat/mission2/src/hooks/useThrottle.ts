import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, interval: number) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdatedRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    const elapsedTime = Date.now() - lastUpdatedRef.current;
    const remainingTime = Math.max(interval - elapsedTime, 0);

    timerRef.current = window.setTimeout(() => {
      setThrottledValue(value);
      lastUpdatedRef.current = Date.now();
      timerRef.current = null;
    }, remainingTime);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [interval, value]);

  return throttledValue;
}
