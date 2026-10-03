import { useQuery } from '@tanstack/react-query';
import { getTvSeason } from '@/services/tmdb/media.service';
import { queryKeys } from '@/config/query-keys';
import type { TmdbEpisode } from '@/types/tmdb/media-episode';

export const useTvSeason = (tmdbId?: string, seasonNumber?: number) => {
    return useQuery({
        queryKey: queryKeys.detail.tvSeason(tmdbId || '', seasonNumber ?? 0),
        queryFn: async () => {
            if (!tmdbId || seasonNumber === undefined) throw new Error('ID and season required');
            const response = await getTvSeason(tmdbId, seasonNumber);
            return response.data.episodes as TmdbEpisode[];
        },
        enabled: !!tmdbId && seasonNumber !== undefined,
        staleTime: 1000 * 60 * 30,
    });
};
