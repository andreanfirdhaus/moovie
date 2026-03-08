import { useHome } from '@/features/home/hooks/use-home';
import { HeroSection } from '@/features/home/components/hero-section';
import { TrailersSection } from '@/features/home/components/trailers-section';
import Loading from '@/components/ui/spinner';

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

    if (isLoading) return <Loading />;

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
