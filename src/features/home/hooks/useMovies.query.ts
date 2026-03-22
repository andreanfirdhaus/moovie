import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getTrendingMovies } from '@/services/tmdb/movie.service';

export const useTrendingMovies = () => {
    return useQuery({
        queryKey: queryKeys.movies.trending(),
        queryFn: async () => {
            const response = await getTrendingMovies();
            return response.data.results;
        },
    });
};
