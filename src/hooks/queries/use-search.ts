import { useQuery } from '@tanstack/react-query';
import { searchMulti, searchMovies, searchSeries } from '@/api/search/route';
import { GetListPayload } from '@/types/tmdb/api-payloads';

const defaultPayload: GetListPayload = { region: 'ID' };

export const useSearchMulti = (query: string, page: number = 1, enabled: boolean = !!query) => {
    return useQuery({
        queryKey: ['search', 'multi', query, page],
        queryFn: async () => {
            if (!query || query.trim().length === 0) {
                return { results: [], total_pages: 0, total_results: 0, page: 1 };
            }
            const response = await searchMulti(query, page, defaultPayload);
            return {
                results: response.data.results,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
                page: response.data.page,
            };
        },
        enabled: enabled && query.trim().length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useSearchMovies = (query: string, page: number = 1, enabled: boolean = !!query) => {
    return useQuery({
        queryKey: ['search', 'movies', query, page],
        queryFn: async () => {
            if (!query || query.trim().length === 0) {
                return { results: [], total_pages: 0, total_results: 0, page: 1 };
            }
            const response = await searchMovies(query, page, defaultPayload);
            return {
                results: response.data.results,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
                page: response.data.page,
            };
        },
        enabled: enabled && query.trim().length > 0,
        staleTime: 5 * 60 * 1000,
    });
};

export const useSearchSeries = (query: string, page: number = 1, enabled: boolean = !!query) => {
    return useQuery({
        queryKey: ['search', 'series', query, page],
        queryFn: async () => {
            if (!query || query.trim().length === 0) {
                return { results: [], total_pages: 0, total_results: 0, page: 1 };
            }
            const response = await searchSeries(query, page, defaultPayload);
            return {
                results: response.data.results,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
                page: response.data.page,
            };
        },
        enabled: enabled && query.trim().length > 0,
        staleTime: 5 * 60 * 1000,
    });
};
