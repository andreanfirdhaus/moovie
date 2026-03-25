import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getPopularSeries, getTopRatedSeries, getDiscoverSeries } from '@/services/tmdb/series.service';
import {
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getDiscoverMovies,
} from '@/services/tmdb/movie.service';

// pass `enabled` flag to prevent fetching when this query is not needed.
export const usePopularMovies = (page: number = 1, genreIds?: number[], sortBy?: string, enabled = true) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'popularity.desc');

    return useQuery({
        queryKey: [...queryKeys.movies.popular(), page, genreIds, sortBy],
        enabled,
        queryFn: async () => {
            let response;

            if (hasFilters) {
                const payload = {
                    sort_by: sortBy || 'popularity.desc',
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverMovies(page, payload);
            } else {
                response = await getPopularMovies(page);
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

export const useUpcomingMovies = (page: number = 1, genreIds?: number[], sortBy?: string, enabled = true) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'popularity.desc');

    return useQuery({
        queryKey: [...queryKeys.movies.upcoming(), page, genreIds, sortBy],
        enabled,
        queryFn: async () => {
            let response;

            if (hasFilters) {
                const today = new Date().toISOString().split('T')[0];
                const payload = {
                    sort_by: sortBy || 'popularity.desc',
                    'primary_release_date.gte': today,
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverMovies(page, payload);
            } else {
                response = await getUpcomingMovies(page);
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

export const useTopRatedMovies = (page: number = 1, genreIds?: number[], sortBy?: string, enabled = true) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'vote_average.desc');

    return useQuery({
        queryKey: [...queryKeys.movies.topRated(), page, genreIds, sortBy],
        enabled,
        queryFn: async () => {
            let response;

            if (hasFilters) {
                const payload = {
                    sort_by: sortBy || 'vote_average.desc',
                    'vote_count.gte': 100,
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverMovies(page, payload);
            } else {
                response = await getTopRatedMovies(page);
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

export const usePopularSeries = (page: number = 1, genreIds?: number[], sortBy?: string, enabled = true) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'popularity.desc');

    return useQuery({
        queryKey: [...queryKeys.series.popular(), page, genreIds, sortBy],
        enabled,
        queryFn: async () => {
            let response;

            if (hasFilters) {
                const payload = {
                    sort_by: sortBy || 'popularity.desc',
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverSeries(page, payload);
            } else {
                response = await getPopularSeries(page);
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

export const useTopRatedSeries = (page: number = 1, genreIds?: number[], sortBy?: string, enabled = true) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'vote_average.desc');

    return useQuery({
        queryKey: [...queryKeys.series.topRated(), page, genreIds, sortBy],
        enabled,
        queryFn: async () => {
            let response;

            if (hasFilters) {
                const payload = {
                    sort_by: sortBy || 'vote_average.desc',
                    'vote_count.gte': 100,
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverSeries(page, payload);
            } else {
                response = await getTopRatedSeries(page);
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
