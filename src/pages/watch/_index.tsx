import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { WatchState, StreamingSeason, StreamingEpisode } from '@/types/streaming';

export default function WatchPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as WatchState | null;

    const [activeSeason, setActiveSeason] = useState<number>(state?.seasons?.[0]?.season ?? 1);
    const [activeEpisode, setActiveEpisode] = useState<StreamingEpisode | null>(
        state?.seasons?.[0]?.episodes?.[0] ?? null
    );

    if (!state?.playerUrl) {
        return (
            <main className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>Content not available.</p>
                <button
                    onClick={() => navigate(-1)}
                    className='ml-4 text-blue-400 hover:text-blue-300 text-sm underline'>
                    Go back
                </button>
            </main>
        );
    }

    const { title, playerUrl, seasons } = state;
    const isTv = Array.isArray(seasons) && seasons.length > 0;

    const currentSeason: StreamingSeason | undefined =
        isTv ? seasons!.find((s) => s.season === activeSeason) : undefined;

    const currentPlayerUrl = isTv && activeEpisode ? activeEpisode.playerUrl : playerUrl;

    return (
        <main className='max-w-9xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 pt-20 md:pt-28 lg:pt-32 pb-12'>
            {/* Title */}
            <h1 className='text-xl font-semibold text-zinc-200 mb-4 truncate'>
                {title}
                {isTv && activeEpisode ? ` — S${activeSeason} E${activeEpisode.episode}` : ''}
            </h1>

            {/* Layout */}
            <div className='flex gap-8 items-start'>
                {/* Player */}
                <div className='w-full flex-1 min-w-0'>
                    <div className='aspect-video bg-[#121212] rounded-lg ring-1 ring-white/10 overflow-hidden'>
                        <iframe
                            src={currentPlayerUrl}
                            className='w-full h-full'
                            allowFullScreen
                            allow='autoplay; encrypted-media; picture-in-picture'
                            referrerPolicy='no-referrer'
                            sandbox='allow-scripts allow-same-origin allow-presentation'
                        />
                    </div>
                </div>

                {/* Season + Episode panel — TV only, desktop */}
                {isTv && currentSeason && (
                    <aside className='hidden lg:flex flex-col flex-shrink-0'>
                        <div className='bg-[#111111] rounded-xl overflow-hidden w-72 xl:w-80 p-4'>
                            {/* Season tabs */}
                            <div className='flex gap-2 flex-wrap mb-4'>
                                {seasons!.map((s) => (
                                    <button
                                        key={s.season}
                                        onClick={() => {
                                            setActiveSeason(s.season);
                                            setActiveEpisode(s.episodes[0] ?? null);
                                        }}
                                        className={`px-3.5 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                            activeSeason === s.season ?
                                                'bg-zinc-100 text-zinc-900'
                                            :   'bg-[#1e1e1e] text-zinc-400 hover:text-zinc-200'
                                        }`}>
                                        S{s.season}
                                    </button>
                                ))}
                            </div>

                            {/* Episode grid */}
                            <div className='grid grid-cols-6 gap-2 overflow-y-auto max-h-96'>
                                {currentSeason.episodes.map((ep) => {
                                    const isActive =
                                        activeEpisode?.episode === ep.episode && activeSeason === currentSeason.season;
                                    return (
                                        <button
                                            key={ep.episode}
                                            onClick={() => setActiveEpisode(ep)}
                                            className={`aspect-square flex items-center justify-center rounded-md text-sm font-semibold transition-colors duration-200 ${
                                                isActive ? 'bg-zinc-100 text-zinc-900' : (
                                                    'bg-[#1e1e1e] text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                                )
                                            }`}>
                                            {ep.episode}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                )}
            </div>

            {/* Season + Episode — mobile */}
            {isTv && currentSeason && (
                <section className='lg:hidden mt-6'>
                    <div className='bg-[#111111] rounded-xl p-4'>
                        <div className='flex gap-2 flex-wrap mb-4'>
                            {seasons!.map((s) => (
                                <button
                                    key={s.season}
                                    onClick={() => {
                                        setActiveSeason(s.season);
                                        setActiveEpisode(s.episodes[0] ?? null);
                                    }}
                                    className={`px-3.5 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                                        activeSeason === s.season ?
                                            'bg-zinc-100 text-zinc-900'
                                        :   'bg-[#1e1e1e] text-zinc-400 hover:text-zinc-200'
                                    }`}>
                                    S{s.season}
                                </button>
                            ))}
                        </div>

                        <div className='grid grid-cols-7 sm:grid-cols-10 gap-2'>
                            {currentSeason.episodes.map((ep) => {
                                const isActive =
                                    activeEpisode?.episode === ep.episode && activeSeason === currentSeason.season;
                                return (
                                    <button
                                        key={ep.episode}
                                        onClick={() => setActiveEpisode(ep)}
                                        className={`aspect-square flex items-center justify-center rounded-md text-sm font-semibold transition-colors duration-200 ${
                                            isActive ? 'bg-zinc-100 text-zinc-900' : (
                                                'bg-[#1e1e1e] text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                            )
                                        }`}>
                                        {ep.episode}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
