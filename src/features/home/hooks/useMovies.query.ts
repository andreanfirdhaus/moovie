import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getTrendingAll, getTrendingMovies } from '@/services/tmdb/movie.service';

export const useTrendingAll = () => {
    return useQuery({
        queryKey: queryKeys.trending.daily(),
        queryFn: async () => {
            const response = await getTrendingAll('day');
            return response.data.results;
        },
    });
};

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: queryKeys.movies.trending(),
        queryFn: async () => {
            const response = await getTrendingMovies();
            return response.data.results;
        },
    });
};
