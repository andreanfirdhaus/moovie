import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

import { PlayerFrame, SeasonEpisodePanel, ServerSelector, EmbedControls, TmdbEpisodePanel } from './components';
import { useStreamResolver } from './hooks/useStreamResolver';
import { useTvSeason } from './hooks/useTvSeason.query';
import { EMBED_SERVERS } from '../../constants/embed';
import type { PageState, ServerOption } from './types';
import type { StreamEpisode, StreamSeason } from '@/types/stream';

const STREAM_SERVER_ID = 'stream' as const;
const STREAM_SERVER_LABEL = 'API' as const;

export default function WatchPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const pageState = location.state as PageState | null;

    if (!pageState?.id || !pageState?.title) {
        return (
            <main className='flex flex-col items-center justify-center h-dvh gap-3'>
                <p className='text-zinc-400 text-lg'>Content not available.</p>
                <button
                    onClick={() => navigate(-1)}
                    className='text-brand hover:text-brand/80 flex items-center gap-1.5 text-sm'>
                    <ArrowLeft size={14} /> Go back
                </button>
            </main>
        );
    }

    const { title, year, type, id: tmdbId, tmdbId: tmdbNumericId, tmdbSeasons } = pageState;
    const isTv = type === 'tv';
    const isFromExternalApi = !!pageState.playerUrl;
    const hasTmdbSeasons = isTv && !isFromExternalApi && !!tmdbSeasons?.length;

    const streamHook = useStreamResolver({
        title,
        year,
        type,
        initialResolved:
            isFromExternalApi ? { playerUrl: pageState.playerUrl!, seasons: pageState.seasons } : undefined,
    });

    const [activeServerId, setActiveServerId] = useState<string>(
        isFromExternalApi ? STREAM_SERVER_ID : EMBED_SERVERS[0].id
    );
    const [activeSeason, setActiveSeason] = useState<number>(tmdbSeasons?.[0]?.season_number ?? 1);
    const [activeEpisode, setActiveEpisode] = useState<number>(1);
    const [streamSeasons, setStreamSeasons] = useState(isFromExternalApi ? pageState.seasons : undefined);

    const { data: tmdbEpisodes = [], isLoading: isLoadingEpisodes } = useTvSeason(
        hasTmdbSeasons ? tmdbNumericId : undefined,
        hasTmdbSeasons ? activeSeason : undefined
    );

    useEffect(() => {
        if (streamHook.resolved?.seasons) {
            setStreamSeasons(streamHook.resolved.seasons);
            const firstSeason = streamHook.resolved.seasons[0];
            if (firstSeason) {
                setActiveSeason(firstSeason.season);
                setActiveEpisode(firstSeason.episodes?.[0]?.episode ?? 1);
            }
        }
    }, [streamHook.resolved]);

    useEffect(() => {
        if (!isFromExternalApi && activeServerId === STREAM_SERVER_ID && streamHook.status === 'idle') {
            streamHook.resolve();
        }
    }, [activeServerId, isFromExternalApi]);

    const handleTmdbSeasonChange = (seasonNumber: number) => {
        setActiveSeason(seasonNumber);
        setActiveEpisode(1);
    };

    const servers: ServerOption[] = [
        ...EMBED_SERVERS.map((s) => ({
            id: s.id,
            label: s.label,
            status: 'ready' as const,
        })),
        {
            id: STREAM_SERVER_ID,
            label: STREAM_SERVER_LABEL,
            status: streamHook.status,
            error: streamHook.error,
        },
    ];

    const playerUrl = useMemo((): string | null => {
        if (activeServerId === STREAM_SERVER_ID) {
            if (streamHook.status !== 'ready' || !streamHook.resolved) return null;

            if (isTv) {
                const season = streamHook.resolved.seasons?.find((s) => s.season === activeSeason);
                const ep = season?.episodes?.find((e) => e.episode === activeEpisode);
                return ep?.playerUrl ?? streamHook.resolved.playerUrl ?? null;
            }
            return streamHook.resolved.playerUrl ?? null;
        }

        const server = EMBED_SERVERS.find((s) => s.id === activeServerId);

        if (!server) return null;

        return isTv ? server.episodeUrl(tmdbId, activeSeason, activeEpisode) : server.movieUrl(tmdbId);
    }, [activeServerId, streamHook.status, streamHook.resolved, activeSeason, activeEpisode, isTv, tmdbId]);

    const handleSelectServer = (id: string) => {
        setActiveServerId(id);
        if (!isFromExternalApi && id === STREAM_SERVER_ID && streamHook.status === 'idle') {
            streamHook.resolve();
        }
    };

    const handleRetry = (id: string) => {
        if (id === STREAM_SERVER_ID) {
            streamHook.reset();
            setTimeout(() => streamHook.resolve(), 50);
        }
    };

    const currentSeasonData: StreamSeason | undefined = streamSeasons?.find((s) => s.season === activeSeason);
    const activeEpisodeObj: StreamEpisode | null =
        currentSeasonData?.episodes?.find((e) => e.episode === activeEpisode) ?? null;

    const handleSeasonChange = (s: StreamSeason) => {
        setActiveSeason(s.season);
        setActiveEpisode(s.episodes?.[0]?.episode ?? 1);
    };

    const isStreamServer = activeServerId === STREAM_SERVER_ID;
    const isLoading = isStreamServer && streamHook.status === 'loading';
    const isError = isStreamServer && streamHook.status === 'error';
    const showStreamSeasonPanel = isTv && isStreamServer && streamHook.status === 'ready' && !!streamSeasons?.length;
    const showTmdbEpisodePanel = hasTmdbSeasons && !isStreamServer;
    const showEmbedTvControls = isTv && !isStreamServer && !hasTmdbSeasons;

    // active panel on the desktop
    const hasSidePanel = showTmdbEpisodePanel || showStreamSeasonPanel || showEmbedTvControls;
    const placeholderCls =
        'w-full max-sm:h-64 aspect-video rounded-xl border border-zinc-800 flex flex-col items-center justify-center';

    const playerArea = (
        <div className={`w-full min-w-0 ${isTv ? 'lg:flex-1' : ''}`}>
            {isLoading && (
                <div className={`${placeholderCls} gap-3`}>
                    <Loader2 size={32} className='animate-spin text-brand' />
                </div>
            )}

            {isError && (
                <div className={`${placeholderCls} gap-4`}>
                    <AlertCircle size={32} className='text-red-400' />
                    <p className='text-zinc-400 text-sm text-center max-w-xs'>{streamHook.error}</p>
                    <button
                        onClick={() => handleSelectServer(EMBED_SERVERS[0].id)}
                        className='flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand/20 hover:bg-brand/30 text-sm text-brand border border-brand/40 transition-all'>
                        Try {EMBED_SERVERS[0].label}
                    </button>
                </div>
            )}

            {/* movie title — movie type only */}
            {!isLoading && !isError && (
                <div className='flex items-center justify-between space-x-8 pb-4 text-center'>
                    <h1 className='md:text-lg truncate font-semibold text-zinc-100'>{title}</h1>
                    {!isFromExternalApi && (
                        <ServerSelector
                            servers={servers}
                            activeServerId={activeServerId}
                            onSelect={handleSelectServer}
                            onRetry={handleRetry}
                        />
                    )}
                </div>
            )}

            {!isLoading && !isError && playerUrl && <PlayerFrame playerUrl={playerUrl} />}
        </div>
    );

    // type (tv) layout with side panel
    return (
        <main className='w-full px-4 sm:px-6 lg:px-12 xl:px-24  pt-20 md:pt-28 lg:pt-32 pb-12'>
            {!isTv ?
                playerArea
            :   <div
                    className={`flex flex-col lg:flex-row gap-6 xl:gap-8 lg:items-start ${!hasSidePanel ? 'lg:max-w-7xl lg:mx-auto' : ''}`}>
                    {playerArea}

                    {hasSidePanel && (
                        <aside className='w-full lg:flex-shrink-0 lg:w-80 xl:w-96 lg:overflow-y-auto scrollbar-hide'>
                            {showTmdbEpisodePanel && tmdbSeasons && (
                                <TmdbEpisodePanel
                                    seasons={tmdbSeasons}
                                    activeSeason={activeSeason}
                                    activeEpisode={activeEpisode}
                                    episodes={tmdbEpisodes}
                                    isLoadingEpisodes={isLoadingEpisodes}
                                    onSeasonChange={handleTmdbSeasonChange}
                                    onEpisodeClick={setActiveEpisode}
                                />
                            )}

                            {showStreamSeasonPanel && currentSeasonData && (
                                <SeasonEpisodePanel
                                    title={title}
                                    seasons={streamSeasons!}
                                    activeSeason={activeSeason}
                                    activeEpisode={activeEpisodeObj}
                                    currentSeason={currentSeasonData}
                                    onSeasonChange={handleSeasonChange}
                                    onEpisodeChange={(ep) => setActiveEpisode(ep.episode)}
                                />
                            )}

                            {showEmbedTvControls && (
                                <EmbedControls
                                    activeSeason={activeSeason}
                                    activeEpisode={activeEpisode}
                                    onSeasonChange={setActiveSeason}
                                    onEpisodeChange={setActiveEpisode}
                                />
                            )}
                        </aside>
                    )}
                </div>
            }
        </main>
    );
}
