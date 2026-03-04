import { useQuery } from '@tanstack/react-query';
import { fetchStreamingCategory } from '@/services/streaming';

export const useStreamingCategory = (action: string, page: number = 1) => {
    return useQuery({
        queryKey: ['streaming', action, page],
        queryFn: async () => {
            const data = await fetchStreamingCategory(action, page);
            return data;
        },
    });
};
