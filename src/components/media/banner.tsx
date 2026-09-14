import { Film, Tv, Compass, Search } from 'lucide-react';

interface MediaHubHeroBannerProps {
    title?: string;
    subtitle?: string;
    gradientVariant?: 'movie' | 'tv' | 'discover' | 'search' | 'profile' | 'settings';
}

export function MediaHubHeroBanner({ title, subtitle, gradientVariant = 'movie' }: MediaHubHeroBannerProps) {
    const isMovie = gradientVariant === 'movie';
    const isTv = gradientVariant === 'tv';
    const isDiscover = gradientVariant === 'discover';
    const isSearch = gradientVariant === 'search';
    const isProfile = gradientVariant === 'profile';
    const isSettings = gradientVariant === 'settings';

    return (
        <section className='relative w-full h-[220px] sm:h-[264px] max-h-[264px] overflow-hidden flex flex-col justify-end'>
            <div className='absolute z-10 inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none' />
            {/* Gradient Backgrounds */}
            {isMovie && (
                <div className='absolute inset-0 bg-gradient-to-r from-rose-950/70 via-purple-950/40 to-surface-base pointer-events-none'>
                    <div className='absolute -top-16 -left-16 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none' />
                </div>
            )}

            {isTv && (
                <div className='absolute inset-0 bg-gradient-to-r from-indigo-950/70 via-blue-950/40 to-surface-base pointer-events-none'>
                    <div className='absolute -top-16 -left-16 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none' />
                </div>
            )}

            {isDiscover && (
                // <div className='absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-teal-950/40 to-surface-base pointer-events-none'>
                //     <div className='absolute -top-16 -left-16 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none' />
                //     <div className='absolute top-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none' />
                // </div>
                <div className='absolute inset-0 bg-gradient-to-r from-primary-active/20 via-primary-muted/5 to-surface-base pointer-events-none'>
                    <div className='absolute -top-24 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none' />
                </div>
            )}

            {isSearch && (
                // <div className='absolute inset-0 bg-gradient-to-r from-violet-950/70 via-slate-950/40 to-surface-base pointer-events-none'>
                //     <div className='absolute -top-16 -left-16 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none' />
                //     <div className='absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none' />
                // </div>
                <div className='absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-teal-950/40 to-surface-base pointer-events-none'>
                    <div className='absolute -top-16 -left-16 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute top-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none' />
                </div>
            )}

            {isProfile && (
                <div className='absolute inset-0 bg-gradient-to-r from-black via-zinc-950/90 to-surface-base pointer-events-none'>
                    <div className='absolute -top-16 -left-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute top-0 right-1/4 w-96 h-96 bg-zinc-400/5 rounded-full blur-3xl pointer-events-none' />
                </div>
            )}

            {isSettings && (
                <div className='absolute inset-0 bg-gradient-to-r from-black via-zinc-950/90 to-surface-base pointer-events-none'>
                    <div className='absolute -top-16 -left-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute top-0 right-1/4 w-96 h-96 bg-zinc-400/5 rounded-full blur-3xl pointer-events-none' />
                </div>
            )}

            {/* Subtle decorative grid/overlay pattern */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-surface-base/90 pointer-events-none' />

            {/* Content Header placed above background */}
            <div className='relative z-10 px-4 sm:px-6 pb-6 sm:pb-8'>
                <div className='flex items-center gap-2 mb-2'>
                    {isMovie && (
                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/20'>
                            <Film size={13} />
                            Movies Hub
                        </span>
                    )}

                    {isTv && (
                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'>
                            <Tv size={13} />
                            Series Hub
                        </span>
                    )}

                    {isDiscover && (
                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'>
                            <Compass size={13} />
                            Discover Hub
                        </span>
                    )}

                    {isSearch && (
                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/20'>
                            <Search size={13} />
                            Search Hub
                        </span>
                    )}

                    {/* {isProfile && (
                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/20'>
                            <User size={13} />
                            Profile
                        </span>
                    )} */}

                    {/* {isSettings && (
                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'>
                            <Settings size={13} />
                            Settings
                        </span>
                    )} */}
                </div>

                <h1 className='text-3xl sm:text-4xl font-bold text-foreground'>{title}</h1>

                {subtitle && (
                    <p className='text-xs sm:text-sm text-foreground-muted max-w-xl line-clamp-1 sm:line-clamp-none'>
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}

export const MediaHubHero = MediaHubHeroBanner;
