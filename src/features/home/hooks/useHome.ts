import { useTrendingMoviesWithDetails } from '@/features/home/hooks/useMovies.query';

export const useHome = () => {
    const { data: trendingMovies = [], isLoading: isLoadingTrending } = useTrendingMoviesWithDetails();

    return {
        trendingMovies,
        isLoading: isLoadingTrending,
    };
};
