import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { searchMulti, searchMovies, searchSeries } from '@/services/tmdb/search.service';

export const useSearchMulti = (query: string, page: number = 1, enabled: boolean = !!query) => {
    return useQuery({
        queryKey: queryKeys.search.multi(query, page),
        queryFn: async () => {
            if (!query || query.trim().length === 0) {
                return { results: [], total_pages: 0, total_results: 0, page: 1 };
            }
            const response = await searchMulti(query, page);
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

export const useSearchMovies = (query: string, page: number = 1, enabled: boolean = !!query) => {
    return useQuery({
        queryKey: queryKeys.search.movies(query, page),
        queryFn: async () => {
            if (!query || query.trim().length === 0) {
                return { results: [], total_pages: 0, total_results: 0, page: 1 };
            }
            const response = await searchMovies(query, page);
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
        queryKey: queryKeys.search.series(query, page),
        queryFn: async () => {
            if (!query || query.trim().length === 0) {
                return { results: [], total_pages: 0, total_results: 0, page: 1 };
            }
            const response = await searchSeries(query, page);
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
