import { useQuery } from '@tanstack/react-query';
import {
    getPopularMovies,
    getTrendingMovies,
    getUpcomingMovies,
    getTopRatedMovies,
    getNowPlayingMovies,
    // getNewReleaseMovies,
    getDiscoverMovies,
} from '@/api/movie/route';
import { getDetail } from '@/api/detail/route';
import { GetListPayload } from '@/types/tmdb/api-payloads';
import { queryKeys } from './query-keys';

// default payload for Indonesian region
const defaultPayload: GetListPayload = { region: 'ID' };

export const usePopularMovies = (page: number = 1, genreIds?: number[], sortBy?: string) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'popularity.desc');

    return useQuery({
        queryKey: [...queryKeys.movies.popular(), page, genreIds, sortBy],
        queryFn: async () => {
            let response;

            if (hasFilters) {
                // Use discover endpoint when filters are applied
                const payload = {
                    ...defaultPayload,
                    sort_by: sortBy || 'popularity.desc',
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverMovies(page, payload);
            } else {
                // Use popular endpoint when no filters
                response = await getPopularMovies(page, defaultPayload);
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

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: queryKeys.movies.trending(),
        queryFn: async () => {
            const response = await getTrendingMovies(defaultPayload);
            return response.data.results;
        },
    });
};

export const useUpcomingMovies = (page: number = 1, genreIds?: number[], sortBy?: string) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'popularity.desc');

    return useQuery({
        queryKey: [...queryKeys.movies.upcoming(), page, genreIds, sortBy],
        queryFn: async () => {
            let response;

            if (hasFilters) {
                // Use discover endpoint when filters are applied
                const today = new Date().toISOString().split('T')[0];
                const payload = {
                    ...defaultPayload,
                    sort_by: sortBy || 'popularity.desc',
                    'primary_release_date.gte': today, // upcoming movies
                    ...(genreIds && genreIds.length > 0 && { with_genres: genreIds.join(',') }),
                };
                response = await getDiscoverMovies(page, payload);
            } else {
                // Use upcoming endpoint when no filters
                response = await getUpcomingMovies(page, defaultPayload);
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

export const useTopRatedMovies = (page: number = 1, genreIds?: number[], sortBy?: string) => {
    const hasFilters = (genreIds && genreIds.length > 0) || (sortBy && sortBy !== 'vote_average.desc');

    return useQuery({
        queryKey: [...queryKeys.movies.topRated(), page, genreIds, sortBy],
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
                response = await getDiscoverMovies(page, payload);
            } else {
                // Use top_rated endpoint when no filters
                response = await getTopRatedMovies(page, defaultPayload);
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

export const useNowPlayingMovies = () => {
    return useQuery({
        queryKey: queryKeys.movies.nowPlaying(),
        queryFn: async () => {
            const response = await getNowPlayingMovies(defaultPayload);
            return response.data.results;
        },
    });
};

// export const useNewReleaseMovies = () => {
//     return useQuery({
//         queryKey: queryKeys.movies.newRelease(),
//         queryFn: async () => {
//             const response = await getNewReleaseMovies(defaultPayload);
//             return response.data;
//         },
//     });
// };

export const useDiscoverMovies = () => {
    return useQuery({
        queryKey: queryKeys.movies.discover(),
        queryFn: async () => {
            const response = await getDiscoverMovies(1, defaultPayload);
            return response.data.results;
        },
    });
};

// fetch trending movies with details
// only fetches details for first 7 movies to reduce API calls
export const useTrendingMoviesWithDetails = () => {
    return useQuery({
        queryKey: [...queryKeys.movies.trending(), 'with-details'],
        queryFn: async () => {
            const trendingResponse = await getTrendingMovies(defaultPayload);
            const trendingMovies = trendingResponse.data.results;

            const moviesForDetails = trendingMovies.slice(0, 7);

            const detailsPromises = moviesForDetails.map((movie) => getDetail(movie.media_type, movie.id, {}));

            const detailsResults = await Promise.all(detailsPromises);

            const moviesWithDetails = trendingMovies.map((movie, index) => {
                if (index < 7) {
                    return {
                        ...movie,
                        runtime: detailsResults[index].data.runtime,
                        genres: detailsResults[index].data.genres,
                    };
                }
                return movie;
            });

            return moviesWithDetails;
        },
    });
};
