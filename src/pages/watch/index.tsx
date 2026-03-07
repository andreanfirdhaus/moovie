import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { WatchState, StreamingSeason, StreamingEpisode } from '@/types/streaming';

function useIframeProgress(key: string) {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Reset & start progress whenever the key (URL) changes
    useEffect(() => {
        setProgress(0);
        setIsLoading(true);

        // Simulate realistic progress: fast early, then stalls near 85%
        const TICK_MS = 80;
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 85) {
                    clearTimer();
                    return 85;
                }
                // Easing: move fast early, slow down as we approach 85
                const step = Math.max(0.4, (85 - prev) * 0.07);
                return Math.min(85, prev + step);
            });
        }, TICK_MS);

        return clearTimer;
    }, [key]);

    // Call this when iframe fires onLoad
    const onIframeLoad = useCallback(() => {
        clearTimer();
        setProgress(100);
        // Small delay so user sees 100% before overlay disappears
        setTimeout(() => setIsLoading(false), 380);
    }, []);

    return { progress, isLoading, onIframeLoad };
}

function LoadingOverlay({ progress }: { progress: number }) {
    return (
        <motion.div
            key='overlay'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#111111] rounded-lg'>
            {/* Percent label */}
            <motion.span
                className='text-zinc-400 text-base font-mono tabular-nums mb-3'
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
                {Math.round(progress)}%
            </motion.span>

            {/* Progress bar track */}
            <div className='w-40 h-[3px] bg-white/5 rounded-full overflow-hidden'>
                <motion.div
                    className='h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]'
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                />
            </div>
        </motion.div>
    );
}

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
                    className='ml-4 text-brand-light hover:text-brand-light/80 text-sm underline'>
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

    // Key changes whenever the player URL changes → triggers fresh loading state
    const playerKey = currentPlayerUrl;
    const { progress, isLoading, onIframeLoad } = useIframeProgress(playerKey);

    return (
        <main className='max-w-9xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 pt-20 md:pt-28 lg:pt-32 pb-12'>
            <div className='flex gap-8 items-start'>
                <div className='w-full flex-1 min-w-0'>
                    <div className='relative aspect-video bg-surface-2 rounded-xl ring-1 ring-white/10 overflow-hidden'>
                        {/* Loading overlay with progress */}
                        <AnimatePresence>{isLoading && <LoadingOverlay progress={progress} />}</AnimatePresence>

                        <iframe
                            key={playerKey}
                            src={currentPlayerUrl}
                            className='w-full h-full'
                            allowFullScreen
                            allow='autoplay; encrypted-media; picture-in-picture'
                            referrerPolicy='no-referrer'
                            sandbox='allow-scripts allow-same-origin allow-presentation'
                            onLoad={onIframeLoad}
                        />
                    </div>
                </div>

                {/* Season + Episode panel — TV only, desktop*/}
                {isTv && currentSeason && (
                    <aside className='hidden lg:flex flex-col flex-shrink-0'>
                        <div className='bg-[#111111] rounded-xl overflow-hidden w-64 p-4'>
                            <h1 className='text-xl font-semibold text-zinc-200 mb-4 text-pretty'>{title}</h1>

                            {/* Season tabs */}
                            <div className='flex gap-2 flex-wrap mb-4'>
                                {seasons!.map((s) => (
                                    <button
                                        key={s.season}
                                        onClick={() => {
                                            setActiveSeason(s.season);
                                            setActiveEpisode(s.episodes[0] ?? null);
                                        }}
                                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                                            activeSeason === s.season ?
                                                'bg-brand/15 text-brand-light'
                                            :   'bg-[#1e1e1e] text-zinc-400 hover:text-zinc-200'
                                        }`}>
                                        Season {s.season}
                                    </button>
                                ))}
                            </div>

                            {/* Episode grid */}
                            <div className='grid grid-cols-5 gap-2 overflow-y-auto max-h-96'>
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
                <section className='lg:hidden mt-4 sm:mt-6'>
                    <div className='bg-[#111111] rounded-xl p-4'>
                        <h1 className='text-xl font-semibold text-zinc-200 mb-4 text-pretty'>{title}</h1>

                        <div className='flex gap-2 flex-wrap mb-4'>
                            {seasons!.map((s) => (
                                <button
                                    key={s.season}
                                    onClick={() => {
                                        setActiveSeason(s.season);
                                        setActiveEpisode(s.episodes[0] ?? null);
                                    }}
                                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                                        activeSeason === s.season ?
                                            'bg-brand/15 text-brand-light'
                                        :   'bg-[#1e1e1e] text-zinc-400 hover:text-zinc-200'
                                    }`}>
                                    Season {s.season}
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
