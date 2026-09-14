/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { useGenres } from '@/features/home/hooks/useGenres.query';
import { getTrendingAll, getTrendingMoviesDay, getTrendingMovies } from '@/services/tmdb/movie.service';
import { getTrendingSeriesDay } from '@/services/tmdb/series.service';

export type HeroMediaType = 'all' | 'movie' | 'tv';
export type HeroTimeWindow = 'day' | 'week';

export const useMediaHero = (mediaType: HeroMediaType = 'all', timeWindow: HeroTimeWindow = 'day') => {
    const { data: genres = {}, isLoading: isLoadingGenres } = useGenres();

    const { data: rawItems = [], isLoading: isLoadingMedia } = useQuery({
        queryKey: ['mediaHero', mediaType, timeWindow],
        queryFn: async () => {
            let res;
            if (mediaType === 'movie') {
                res = timeWindow === 'day' ? await getTrendingMoviesDay() : await getTrendingMovies();
            } else if (mediaType === 'tv') {
                res = await getTrendingSeriesDay();
            } else {
                res = await getTrendingAll(timeWindow);
            }
            return res.data.results || [];
        },
    });

    const items = (rawItems as any[]).map((item) => ({
        ...item,
        media_type: item.media_type || (mediaType !== 'all' ? mediaType : undefined),
        genres: (item.genre_ids ?? []).map((id: number) => ({ id, name: genres[id] ?? '' })),
    }));

    return {
        items,
        isLoading: isLoadingMedia || isLoadingGenres,
    };
};
