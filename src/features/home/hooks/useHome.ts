import { useTrendingAllWeek } from '@/features/home/hooks/useMovies.query';
import { useGenres } from '@/features/home/hooks/useGenres.query';

export const useHome = () => {
    const { data: trendingData = [], isLoading: isLoadingTrending } = useTrendingAllWeek();
    const { data: genres = {}, isLoading: isLoadingGenres } = useGenres();

    const trending = trendingData.map((movie: any) => ({
        ...movie,
        genres: (movie.genre_ids ?? []).map((id: number) => ({ id, name: genres[id] ?? '' })),
    }));

    return {
        trending,
        isLoading: isLoadingTrending || isLoadingGenres,
    };
};
