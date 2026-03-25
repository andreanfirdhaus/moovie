import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getMovieGenres, getTVGenres } from '@/services/tmdb/genre.service';
import type { Genres } from '@/types/tmdb/media';

type Genre = Record<number, string>;

export const useGenres = () => {
    return useQuery({
        queryKey: queryKeys.genres.all,
        queryFn: async (): Promise<Genre> => {
            const [movieRes, tvRes] = await Promise.all([getMovieGenres(), getTVGenres()]);
            const combined: Genres[] = [...movieRes.data.genres, ...tvRes.data.genres];
            return Object.fromEntries(combined.map((g) => [g.id, g.name]));
        },
        staleTime: Infinity,
    });
};
