import { useQuery } from '@tanstack/react-query';
import {
    getPopularSeries,
    getTopRatedSeries,
    getNewReleaseSeries,
    getAiringToday,
    getOnTheAir,
    getDiscoverSeries,
} from '@/api/series/route';
import { GetListPayload } from '@/types/tmdb/api-payloads';
import { queryKeys } from './query-keys';

// Default payload for Indonesian region
const defaultPayload: GetListPayload = { region: 'ID' };

export const usePopularSeries = (page: number = 1, genreIds?: number[], sortBy?: string) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'popularity.desc');

    return useQuery({
        queryKey: [...queryKeys.series.popular(), page, genreIds, sortBy],
        queryFn: async () => {
            let response;

            if (hasFilters) {
                // Use discover endpoint when filters are applied
                const payload = {
                    ...defaultPayload,
                    sort_by: sortBy || 'popularity.desc',
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverSeries(page, payload);
            } else {
                // Use popular endpoint when no filters
                response = await getPopularSeries(page, defaultPayload);
            }

            return {
                results: response.data.results,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
                page: response.data.page,
            };
        },
    });
};

export const useTopRatedSeries = (page: number = 1, genreIds?: number[], sortBy?: string) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'vote_average.desc');

    return useQuery({
        queryKey: [...queryKeys.series.topRated(), page, genreIds, sortBy],
        queryFn: async () => {
            let response;

            if (hasFilters) {
                // Use discover endpoint when filters are applied
                const payload = {
                    ...defaultPayload,
                    sort_by: sortBy || 'vote_average.desc',
                    'vote_count.gte': 100, // minimum votes for top rated
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverSeries(page, payload);
            } else {
                // Use top_rated endpoint when no filters
                response = await getTopRatedSeries(page, defaultPayload);
            }

            return {
                results: response.data.results,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
                page: response.data.page,
            };
        },
    });
};

export const useNewReleaseSeries = () => {
    return useQuery({
        queryKey: queryKeys.series.newRelease(),
        queryFn: async () => {
            const response = await getNewReleaseSeries(defaultPayload);
            return response.data.results;
        },
    });
};

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
