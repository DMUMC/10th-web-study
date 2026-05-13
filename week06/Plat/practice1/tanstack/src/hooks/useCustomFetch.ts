import { useQuery, type UseQueryResult } from '@tanstack/react-query';

export const useCustomFetch = <T,>(url: string) : UseQueryResult<NoInfer<T>, 
    Error> => {
        return useQuery({
            queryKey: [url],
            queryFn: async ({ signal }) => {
                const response = await fetch(url, { signal });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json() as Promise<NoInfer<T>>;
            },
            retry: 10,

            retryDelay: (attemptIndex) => {
                return Math.min(1000 * 2 ** attemptIndex, 30000);
            },

            staleTime: 5 * 60 * 1000,

            gcTime: 10 * 60 * 1000,
        });
    };
