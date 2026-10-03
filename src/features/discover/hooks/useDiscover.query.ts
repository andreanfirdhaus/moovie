import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getPopularSeries, getTopRatedSeries, getDiscoverSeries } from '@/services/tmdb/series.service';
import {
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getDiscoverMovies,
} from '@/services/tmdb/movie.service';

export interface DiscoverMediaParams {
    mediaType?: 'movie' | 'tv';
    page?: number;
    genreIds?: number[];
    providerIds?: number[];
    sortBy?: string;
    fromYear?: string;
    toYear?: string;
    country?: string;
    enabled?: boolean;
}

export const useDiscoverMedia = ({
    mediaType = 'movie',
    page = 1,
    genreIds = [],
    providerIds = [],
    sortBy = 'popularity.desc',
    fromYear,
    toYear,
    country,
    enabled = true,
}: DiscoverMediaParams) => {
    return useQuery({
        queryKey: ['discover', mediaType, page, genreIds, providerIds, sortBy, fromYear, toYear, country],
        enabled,
        queryFn: async () => {
            const isMovie = mediaType === 'movie';
            const payload: Record<string, unknown> = {
                sort_by: sortBy || 'popularity.desc',
            };

            if (sortBy === 'vote_average.desc') {
                payload['vote_count.gte'] = 200;
            }

            if (genreIds && genreIds.length > 0) {
                payload.with_genres = genreIds.join(',');
            }

            if (providerIds && providerIds.length > 0) {
                payload.with_watch_providers = providerIds.join('|');
                // if (country && country !== 'ALL') {
                //     payload.watch_region = country;
                // }
                payload.watch_region = country && country !== 'ALL' ? country : 'US';
            }

            if (country && country !== 'ALL') {
                payload.with_origin_country = country;
            }

            if (fromYear) {
                if (isMovie) {
                    payload['primary_release_date.gte'] = `${fromYear}-01-01`;
                } else {
                    payload['first_air_date.gte'] = `${fromYear}-01-01`;
                }
            }

            if (toYear) {
                if (isMovie) {
                    payload['primary_release_date.lte'] = `${toYear}-12-31`;
                } else {
                    payload['first_air_date.lte'] = `${toYear}-12-31`;
                }
            }

            const response = isMovie ? await getDiscoverMovies(page, payload) : await getDiscoverSeries(page, payload);

            return {
                results: response.data.results || [],
                total_pages: response.data.total_pages || 0,
                total_results: response.data.total_results || 0,
                page: response.data.page || 1,
            };
        },
    });
};

export const useInfiniteDiscoverMedia = ({
    mediaType = 'movie',
    genreIds = [],
    providerIds = [],
    sortBy = 'popularity.desc',
    fromYear,
    toYear,
    country,
    enabled = true,
}: Omit<DiscoverMediaParams, 'page'>) => {
    return useInfiniteQuery({
        queryKey: ['discoverInfinite', mediaType, genreIds, providerIds, sortBy, fromYear, toYear, country],
        enabled,
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const isMovie = mediaType === 'movie';
            const payload: Record<string, unknown> = {
                sort_by: sortBy || 'popularity.desc',
            };

            if (sortBy === 'vote_average.desc') {
                payload['vote_count.gte'] = 200;
            }

            if (genreIds && genreIds.length > 0) {
                payload.with_genres = genreIds.join(',');
            }

            if (providerIds && providerIds.length > 0) {
                payload.with_watch_providers = providerIds.join('|');
                // if (country && country !== 'ALL') {
                //     payload.watch_region = country;
                // }
                payload.watch_region = country && country !== 'ALL' ? country : 'US';
            }

            if (country && country !== 'ALL') {
                payload.with_origin_country = country;
            }

            if (fromYear) {
                if (isMovie) {
                    payload['primary_release_date.gte'] = `${fromYear}-01-01`;
                } else {
                    payload['first_air_date.gte'] = `${fromYear}-01-01`;
                }
            }

            if (toYear) {
                if (isMovie) {
                    payload['primary_release_date.lte'] = `${toYear}-12-31`;
                } else {
                    payload['first_air_date.lte'] = `${toYear}-12-31`;
                }
            }

            const response =
                isMovie ?
                    await getDiscoverMovies(pageParam as number, payload)
                :   await getDiscoverSeries(pageParam as number, payload);

            return {
                results: response.data.results || [],
                total_pages: response.data.total_pages || 0,
                total_results: response.data.total_results || 0,
                page: (response.data.page as number) || (pageParam as number),
            };
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages && lastPage.page < 500) {
                return lastPage.page + 1;
            }
            return undefined;
        },
    });
};

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
