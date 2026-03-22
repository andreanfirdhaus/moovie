import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getAiringToday, getOnTheAir, getDiscoverSeries } from '@/services/tmdb/series.service';

export const useAiringToday = () => {
    return useQuery({
        queryKey: queryKeys.series.airingToday(),
        queryFn: async () => {
            const response = await getAiringToday();
            return response.data.results;
        },
    });
};

export const useOnTheAir = () => {
    return useQuery({
        queryKey: queryKeys.series.onTheAir(),
        queryFn: async () => {
            const response = await getOnTheAir();
            return response.data.results;
        },
    });
};

export const useDiscoverSeries = () => {
    return useQuery({
        queryKey: queryKeys.series.discover(),
        queryFn: async () => {
            const response = await getDiscoverSeries(1);
            return response.data.results;
        },
    });
};
