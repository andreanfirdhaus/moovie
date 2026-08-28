import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getTrendingAll, getTrendingMovies } from '@/services/tmdb/movie.service';

export const useTrendingAllWeek = () => {
    return useQuery({
        queryKey: queryKeys.trending.weekly(),
        queryFn: async () => {
            const response = await getTrendingAll('week');
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
