import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { WatchState, StreamingSeason, StreamingEpisode } from '@/types/streaming';
import PlayerFrame from '@/features/watch/components/player-frame';
import SeasonEpisodePanel from '@/features/watch/components/season-episode-panel';

export default function WatchPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as WatchState | null;

    if (!state?.playerUrl) {
        return (
            <main className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>Content not available.</p>
                <button
                    onClick={() => navigate(-1)}
                    className='ml-2 text-brand-light hover:text-brand-light/80 no-underline'>
                    Go back
                </button>
            </main>
        );
    }

    const { title, playerUrl, seasons } = state;
    const isTv = Array.isArray(seasons) && seasons.length > 0;

    const [activeSeason, setActiveSeason] = useState<number>(seasons?.[0]?.season ?? 1);
    const [activeEpisode, setActiveEpisode] = useState<StreamingEpisode | null>(seasons?.[0]?.episodes?.[0] ?? null);

    const currentSeason: StreamingSeason | undefined =
        isTv ? seasons!.find((s) => s.season === activeSeason) : undefined;
    const currentPlayerUrl = isTv && activeEpisode ? activeEpisode.playerUrl : playerUrl;

    const handleSeasonChange = (s: StreamingSeason) => {
        setActiveSeason(s.season);
        setActiveEpisode(s.episodes[0] ?? null);
    };

    return (
        <main className='max-w-9xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 pt-20 md:pt-28 lg:pt-32 pb-12'>
            <div className='flex gap-8 items-start'>
                {/* iframe */}
                <div className='w-full flex-1 min-w-0'>
                    <PlayerFrame playerUrl={currentPlayerUrl} />
                </div>

                {/* Season + Episode panel — TV only, desktop */}
                {isTv && currentSeason && (
                    <aside className='hidden lg:flex flex-col flex-shrink-0 w-72'>
                        <SeasonEpisodePanel
                            title={title}
                            seasons={seasons!}
                            activeSeason={activeSeason}
                            activeEpisode={activeEpisode}
                            currentSeason={currentSeason}
                            onSeasonChange={handleSeasonChange}
                            onEpisodeChange={setActiveEpisode}
                            episodeGridCols='grid-cols-4'
                            titleSize='text-2xl'
                        />
                    </aside>
                )}
            </div>

            {/* Season + Episode panel — TV only, mobile */}
            {isTv && currentSeason && (
                <section className='lg:hidden mt-2 sm:mt-6 p-2'>
                    <SeasonEpisodePanel
                        title={title}
                        seasons={seasons!}
                        activeSeason={activeSeason}
                        activeEpisode={activeEpisode}
                        currentSeason={currentSeason}
                        onSeasonChange={handleSeasonChange}
                        onEpisodeChange={setActiveEpisode}
                        episodeGridCols='grid-cols-6 sm:grid-cols-10'
                        titleSize='text-xl'
                    />
                </section>
            )}

            {/* movie title */}
            {!isTv && (
                <div className='px-2 py-4'>
                    <h1 className='text-xl font-semibold text-zinc-100'>{title}</h1>
                </div>
            )}
        </main>
    );
}
