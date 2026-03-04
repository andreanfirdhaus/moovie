import { useState } from 'react';
import { useTrendingMoviesWithDetails } from '@/features/home/queries/use-movies';
import { useTrendingTrailers } from './use-trailers';

export const useHome = () => {
    const { data: trendingMovies = [], isLoading: isLoadingTrending } = useTrendingMoviesWithDetails();
    const { data: latestTrailers = [], isLoading: isLoadingTrailers } = useTrendingTrailers();

    const [selectedTrailers, setSelectedTrailers] = useState<{ id: number; type: string } | null>(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const handleOpenTrailer = (id: number, type: string) => {
        setSelectedTrailers({ id, type });
        setIsTrailerOpen(true);
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
        setTimeout(() => setSelectedTrailers(null), 300);
    };

    return {
        // Data
        trendingMovies,
        latestTrailers,
        isLoading: isLoadingTrending,
        isLoadingTrailers,

        // Modal State
        selectedTrailers,
        isTrailerOpen,

        // Handlers
        handleOpenTrailer,
        handleCloseTrailer,
    };
};
