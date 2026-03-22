import { useTrendingMovies } from '@/features/home/hooks/useMovies.query';
import { useGenres } from '@/features/home/hooks/useGenres.query';

export const useHome = () => {
    const { data: trendingData = [], isLoading: isLoadingTrending } = useTrendingMovies();
    const { data: genres = {}, isLoading: isLoadingGenres } = useGenres();

    const trendingMovies = trendingData.map((movie) => ({
        ...movie,
        genres: (movie.genre_ids ?? []).map((id: number) => ({ id, name: genres[id] ?? '' })),
    }));

    return {
        trendingMovies,
        isLoading: isLoadingTrending || isLoadingGenres,
    };
};
