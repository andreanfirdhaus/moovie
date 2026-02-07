import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useMovieDetail,
    useMovieCredits,
    useMovieRecommendations,
    useMovieKeywords,
} from '@/utils/hooks/queries/useDetail';

export function useDetail() {
    const { type, id } = useParams();

    // Data Fetching
    const { data: detail, isLoading: isLoadingDetail } = useMovieDetail(type, id);
    const { data: credits = [], isLoading: isLoadingCredits } = useMovieCredits(type, id);
    const { data: recommendations = [], isLoading: isLoadingRecommendations } = useMovieRecommendations(type, id);
    const { data: keywords = [] } = useMovieKeywords(type, id);

    // Local State
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<{ id: number; type: string } | null>(null);

    // Derived State
    const isLoading = isLoadingDetail || isLoadingCredits || isLoadingRecommendations;
    const allSeasons = (detail as any)?.seasons || [];

    // Handlers
    const handleTrailerClick = (movieId: number, mediaType: string) => {
        setSelectedMovie({ id: movieId, type: mediaType });
        setIsTrailerOpen(true);
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
        setTimeout(() => setSelectedMovie(null), 300);
    };

    return {
        // Params
        type,
        id,
        // Data
        detail,
        credits,
        recommendations,
        keywords,
        allSeasons,
        // States
        isLoading,
        isTrailerOpen,
        selectedMovie,
        // Handlers
        handleTrailerClick,
        handleCloseTrailer,
    };
}
