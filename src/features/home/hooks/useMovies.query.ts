import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getTrendingMovies, getDiscoverMovies, getNowPlayingMovies } from '@/services/tmdb/movie.service';
import { getDetail } from '@/services/tmdb/media.service';

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: queryKeys.movies.trending(),
        queryFn: async () => {
            const response = await getTrendingMovies();
            return response.data.results;
        },
    });
};

export const useNowPlayingMovies = () => {
    return useQuery({
        queryKey: queryKeys.movies.nowPlaying(),
        queryFn: async () => {
            const response = await getNowPlayingMovies();
            return response.data.results;
        },
    });
};

export const useDiscoverMovies = () => {
    return useQuery({
        queryKey: queryKeys.movies.discover(),
        queryFn: async () => {
            const response = await getDiscoverMovies(1);
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
            const trendingResponse = await getTrendingMovies();
            const trendingMovies = trendingResponse.data.results;

            const moviesForDetails = trendingMovies.slice(0, 7);

            const detailsPromises = moviesForDetails.map((movie) => getDetail(movie.media_type, movie.id));

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
