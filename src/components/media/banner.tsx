interface MediaHubHeroBannerProps {
    gradientVariant?: 'blue' | 'white';
}

export function MediaHubHeroBanner({ gradientVariant }: MediaHubHeroBannerProps) {
    const isBlue = gradientVariant === 'blue';
    const isWhite = gradientVariant === 'white';

    return (
        <section className='relative w-full h-[220px] sm:h-[264px] max-h-[264px] overflow-hidden flex flex-col justify-end'>
            <div className='absolute z-10 inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none' />
            {/* Gradient Backgrounds */}
            {isBlue && (
                <div className='absolute inset-0 bg-gradient-to-r from-primary-active/20 via-primary-muted/5 to-surface-base pointer-events-none'>
                    <div className='absolute -top-24 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none' />
                </div>
            )}

            {isWhite && (
                <div className='absolute inset-0 bg-gradient-to-r from-black via-zinc-950/90 to-surface-base pointer-events-none'>
                    <div className='absolute -top-16 -left-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute top-0 right-1/4 w-96 h-96 bg-zinc-400/5 rounded-full blur-3xl pointer-events-none' />
                </div>
            )}

            {/* Subtle decorative grid/overlay pattern */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-surface-base/90 pointer-events-none' />
        </section>
    );
}

export const MediaHubHero = MediaHubHeroBanner;
