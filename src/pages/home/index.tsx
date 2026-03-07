import { useHome } from '@/features/home/hooks/use-home';
import { HeroSection } from '@/features/home/components/hero-section';
import { TrailersSection } from '@/features/home/components/trailers-section';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Home() {
    const {
        trendingMovies,
        latestTrailers,
        isLoading,
        isLoadingTrailers,
        selectedTrailers,
        isTrailerOpen,
        handleOpenTrailer,
        handleCloseTrailer,
    } = useHome();

    if (isLoading) {
        return (
            <>
                <div className='relative h-[456px] md:min-h-[680px] animate-pulse'>
                    <div className='h-full w-full bg-surface-2' />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent' />
                    <div className='absolute bottom-8 md:bottom-20 left-0 right-0 px-4 sm:px-6 lg:px-12 xl:px-24'>
                        <div className='mb-3 sm:mb-4 md:5 space-y-2.5'>
                            <div className='h-7 md:h-10 lg:h-12 bg-surface-3 rounded-md w-2/3 max-w-lg' />
                            <div className='h-7 md:h-10  bg-surface-3 rounded-md w-2/5 max-w-xs' />
                        </div>
                        <div className='h-9 bg-surface-3 rounded-full w-24' />
                    </div>
                </div>

                <div className='max-w-9xl mx-auto lg:mx-16 pt-12 pb-8 px-4 sm:px-6 lg:px-8 animate-pulse'>
                    <div className='h-7 md:h-10  bg-surface-3 rounded-md w-2/5 max-w-[236px]' />
                    <div className=' py-4 flex gap-4 overflow-hidden'>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className='block shrink-0 w-[280px] sm:w-[320px]'>
                                <div className='relative w-full aspect-video rounded-lg overflow-hidden mb-3.5 bg-surface-2'>
                                    <div className='absolute inset-0 flex items-center justify-center'></div>
                                </div>

                                <div className='space-y-1.5 mb-0.5'>
                                    <div className='h-4 sm:h-5 bg-surface-3 rounded w-4/5' />
                                </div>

                                <div className='h-3 sm:h-3.5 bg-surface-3 rounded w-1/3 mt-1.5' />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    if (!trendingMovies.length) {
        return (
            <div className='flex items-center justify-center h-dvh'>
                <p className='text-zinc-400 text-lg'>No movies available</p>
            </div>
        );
    }

    return (
        <main>
            {/* trending movie by week */}
            <HeroSection movies={trendingMovies} />

            {/* latest trailers */}
            <TrailersSection
                trailers={latestTrailers}
                isLoading={isLoadingTrailers}
                onPlayClick={handleOpenTrailer}
                // modal props pass-through
                selectedTrailer={selectedTrailers}
                isModalOpen={isTrailerOpen}
                onCloseModal={handleCloseTrailer}
            />
        </main>
    );
}
