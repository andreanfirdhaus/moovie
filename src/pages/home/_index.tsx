import Loading from '@/components/ui/spinner';
import { useHome } from './hooks/useHome';
import { HeroSection } from './hero-section';
import { TrailersSection } from './trailers-section';

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
        return <Loading />;
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
