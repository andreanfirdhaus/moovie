import { useQuery } from '@tanstack/react-query';
import { getAiringToday, getOnTheAir, getDiscoverSeries } from '@/services/tmdb/series.service';
import type { GetListPayload } from '@/types/tmdb/api-payloads';
import { queryKeys } from '@/lib/query-keys';

const defaultPayload: GetListPayload = { region: 'ID' };

export const useAiringToday = () => {
    return useQuery({
        queryKey: queryKeys.series.airingToday(),
        queryFn: async () => {
            const response = await getAiringToday(defaultPayload);
            return response.data.results;
        },
    });
};

export const useOnTheAir = () => {
    return useQuery({
        queryKey: queryKeys.series.onTheAir(),
        queryFn: async () => {
            const response = await getOnTheAir(defaultPayload);
            return response.data.results;
        },
    });
};

export const useDiscoverSeries = () => {
    return useQuery({
        queryKey: queryKeys.series.discover(),
        queryFn: async () => {
            const response = await getDiscoverSeries(1, defaultPayload);
            return response.data.results;
        },
    });
};
