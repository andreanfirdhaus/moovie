import { useQuery } from '@tanstack/react-query';
import { getMovieGenres, getTVGenres } from '@/services/tmdb/genre.service';
import { queryKeys } from '@/config/query-keys';

export const useMovieGenres = () => {
    return useQuery({
        queryKey: queryKeys.genres.movies(),
        queryFn: async () => {
            const response = await getMovieGenres();
            return response.data.genres;
        },
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export const useTVGenres = () => {
    return useQuery({
        queryKey: queryKeys.genres.tv(),
        queryFn: async () => {
            const response = await getTVGenres();
            return response.data.genres;
        },
        staleTime: 1000 * 60 * 60 * 24,
    });
};
