import { useMemo, useState } from 'react';
import { EMBED_SERVERS } from '@/constants/embed';
import { useTvSeason } from './useTvSeason.query';
import type { Seasons } from '@/types/tmdb/media-detail';
import type { ServerOption } from '../types/streaming';

export function useDetailStreaming(type?: string, id?: string, seasons: Seasons[] = []) {
    const isTv = type === 'tv';
    const hasTmdbSeasons = isTv && seasons.length > 0;
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeServerId, setActiveServerId] = useState(EMBED_SERVERS[0].id);
    const [activeSeason, setActiveSeason] = useState(seasons[0]?.season_number ?? 1);
    const [activeEpisode, setActiveEpisode] = useState(1);

    const { data: episodes = [], isLoading: isLoadingEpisodes } = useTvSeason(
        hasTmdbSeasons ? id : undefined,
        hasTmdbSeasons ? activeSeason : undefined
    );

    const servers: ServerOption[] = EMBED_SERVERS.map((server) => ({
        id: server.id,
        label: server.label,
        status: 'ready',
    }));

    const playerUrl = useMemo(() => {
        const server = EMBED_SERVERS.find((item) => item.id === activeServerId);
        if (!server || !id) return null;
        return isTv ? server.episodeUrl(id, activeSeason, activeEpisode) : server.movieUrl(id);
    }, [activeServerId, activeEpisode, activeSeason, id, isTv]);

    const handleSeasonChange = (seasonNumber: number) => {
        setActiveSeason(seasonNumber);
        setActiveEpisode(1);
    };

    return {
        isPlaying,
        setIsPlaying,
        servers,
        activeServerId,
        setActiveServerId,
        activeSeason,
        activeEpisode,
        setActiveEpisode,
        handleSeasonChange,
        episodes,
        isLoadingEpisodes,
        playerUrl,
        hasTmdbSeasons,
        showEmbedTvControls: isTv && !hasTmdbSeasons,
    };
}
