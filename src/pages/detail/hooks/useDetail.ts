import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useMovieDetail,
    useMovieCredits,
    useMovieRecommendations,
    useMovieKeywords,
} from '@/utils/hooks/queries/useDetail';
import { useWatchNow } from './useWatchNow';
import { getMovieTitle, getReleaseYear, getMediaType, parseDetailId } from '@/utils/helper/tmdb-helpers';

export function useDetail() {
    const { type, id } = useParams();
    const numericId = id ? parseDetailId(id) : undefined;

    // Data Fetching
    const { data: detail, isLoading: isLoadingDetail } = useMovieDetail(type, numericId);
    const { data: credits = [], isLoading: isLoadingCredits } = useMovieCredits(type, numericId);
    const { data: recommendations = [], isLoading: isLoadingRecommendations } = useMovieRecommendations(
        type,
        numericId
    );
    const { data: keywords = [] } = useMovieKeywords(type, numericId);

    // Local State
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<{ id: number; type: string } | null>(null);

    // Derived State
    const isLoading = isLoadingDetail || isLoadingCredits || isLoadingRecommendations;
    const allSeasons = (detail as any)?.seasons || [];

    // Watch Now
    const { handleWatchNow, isLoadingWatch, watchError, setWatchError } = useWatchNow({
        title: detail ? getMovieTitle(detail as any) : '',
        year: detail ? getReleaseYear(detail as any) : '',
        type: detail ? getMediaType(detail as any) : type ?? 'movie',
        id: id ?? '',
    });

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
        // Watch Now
        watchError,
        setWatchError,
        handleWatchNow,
        isLoadingWatch,
        // Handlers
        handleTrailerClick,
        handleCloseTrailer,
    };
}
