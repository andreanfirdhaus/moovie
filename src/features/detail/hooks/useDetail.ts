import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useMediaDetail,
    useMediaCredits,
    useMediaRecommendations,
    useMediaKeywords,
} from '@/features/detail/hooks/useDetail.query';
import { parseDetailId } from '@/utils/url';

export function useDetail() {
    const { type, id } = useParams();
    const numericId = id ? parseDetailId(id) : undefined;

    // data fetching
    const { data: detail, isLoading: isLoadingDetail } = useMediaDetail(type, numericId);
    const { data: credits = [], isLoading: isLoadingCredits } = useMediaCredits(type, numericId);
    const { data: recommendations = [], isLoading: isLoadingRecommendations } = useMediaRecommendations(
        type,
        numericId
    );
    const { data: keywords = [] } = useMediaKeywords(type, numericId);

    // localstate
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<{ id: number; type: string } | null>(null);
    const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
    const [isCastModalOpen, setIsCastModalOpen] = useState(false);

    // derived state
    const isLoading = isLoadingDetail || isLoadingCredits || isLoadingRecommendations;
    const allSeasons = (detail as any)?.seasons || [];

    // handlers
    const handleTrailerClick = (movieId: number, mediaType: string) => {
        setSelectedMovie({ id: movieId, type: mediaType });
        setIsTrailerOpen(true);
    };

    const handleCloseTrailer = () => {
        setIsTrailerOpen(false);
        setTimeout(() => setSelectedMovie(null), 300);
    };

    const handleCastClick = (personId: number) => {
        setSelectedPersonId(personId);
        setIsCastModalOpen(true);
    };

    const handleCloseCastModal = () => {
        setIsCastModalOpen(false);
        setTimeout(() => setSelectedPersonId(null), 300);
    };

    return {
        // params
        type,
        id,
        // data
        detail,
        credits,
        recommendations,
        keywords,
        allSeasons,
        // states
        isLoading,
        isTrailerOpen,
        selectedMovie,
        selectedPersonId,
        isCastModalOpen,
        // handlers
        handleTrailerClick,
        handleCloseTrailer,
        handleCastClick,
        handleCloseCastModal,
    };
}
