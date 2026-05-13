import { useEffect, useMemo, useRef, useState } from 'react';

const STALE_TIME = 5 * 60 * 1000;

const MAX_RETRIES = 3;

const INITIAL_RETRY_DELAY = 1000;


interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export const useCustomFetch = <T,>(
  url: string
): { data: T | null; isPending: boolean; isError: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const storageKey = useMemo(() => url, [url]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    setIsError(false);

    const fetchData = async (currentRetry: number = 0): Promise<void> => {
      const currentTime = Date.now();
      const cachedItem = localStorage.getItem(storageKey);

      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          if (currentTime - cachedData.timestamp < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            return;
          }

          setData(cachedData.data);
        } catch {
          localStorage.removeItem(storageKey);
        }
      }

      setIsPending(true);

      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const newData = (await response.json()) as T;
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          timestamp: Date.now(),
        };

        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }

        if(currentRetry < MAX_RETRIES) {
            const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
        
            retryTimeoutRef.current = setTimeout(() => {
            fetchData(currentRetry + 1);
            }, retryDelay);
        } else {
            setIsError(true);
            setIsPending(false);
            return;
        }
        setIsError(true);
        console.log(error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();

      if(retryTimeoutRef.current != null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
};