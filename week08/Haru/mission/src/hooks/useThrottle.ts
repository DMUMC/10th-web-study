import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecutedTime = useRef<number>(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const timeRemaining = delay - (now - lastExecutedTime.current);

    if (timeRemaining <= 0) {
      setThrottledValue(value);
      lastExecutedTime.current = now;
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setThrottledValue(value);
        lastExecutedTime.current = Date.now();
        timerRef.current = null;
      }, timeRemaining);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return throttledValue;
}