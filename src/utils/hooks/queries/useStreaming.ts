import { useQuery } from '@tanstack/react-query';
import { fetchStreamingCategory } from '@/utils/lib/streaming';

export const useStreamingCategory = (action: string, page: number = 1) => {
    return useQuery({
        queryKey: ['streaming', action, page],
        queryFn: () => fetchStreamingCategory(action, page),
        enabled: !!action,
        staleTime: 5 * 60 * 1000,
    });
};
