import { useEffect, useRef, useState } from "react";

export default function useThrottle<T>(
    value: T,
    delay: number
) {
    const [throttledValue, setThrottledValue] =
        useState(value);

    const lastExecuted =
        useRef<number>(Date.now());

    const timeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null
        );

    useEffect(() => {
        const now = Date.now();

        const remaining =
            delay - (now - lastExecuted.current);

        if (remaining <= 0) {
            setThrottledValue(value);
            lastExecuted.current = now;
        } else {
            timeoutRef.current = setTimeout(() => {
                setThrottledValue(value);
                lastExecuted.current = Date.now();
            }, remaining);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay]);

    return throttledValue;
}