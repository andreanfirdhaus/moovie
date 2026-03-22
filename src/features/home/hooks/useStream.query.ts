import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchStreamCategory } from '@/services/stream';

export const useStreamCategory = (action: string) => {
    return useInfiniteQuery({
        queryKey: ['stream', action],
        queryFn: async ({ pageParam = 1 }) => {
            const data = await fetchStreamCategory(action, pageParam);
            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasMore ? allPages.length + 1 : undefined;
        },
        staleTime: 1000 * 60 * 10,
    });
};
