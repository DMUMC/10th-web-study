import { useEffect, useState } from "react";
import axios from "axios";

interface UseFetchResult<T> {
    data: T | null;
    isPending: boolean;
    isError: boolean;
}

export function useCustomFetch<T>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!url) return;

        setIsPending(true);
        setIsError(false);
        setData(null);

        const fetchData = async (): Promise<void> => {
            try {
                const { data: result } = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    },
                });
                setData(result);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, isPending, isError };
}