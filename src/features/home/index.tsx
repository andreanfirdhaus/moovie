import { useHome } from '@/features/home/hooks/useHome';
import { HomeHero } from '@/features/home/components/home-hero';
import { StreamSection } from '@/features/home/components/stream-section';
import { PopularSection } from './components/popular-section';

export default function Home() {
    const { trendingMovies } = useHome();
    return (
        <main>
            {/* trending movie by week */}
            <HomeHero movies={trendingMovies} />

            <PopularSection />

            <StreamSection />
        </main>
    );
}
