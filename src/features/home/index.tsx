import { useHome } from '@/features/home/hooks/useHome';
import { HomeHero } from '@/features/home/components/home-hero';
import { PopularSection } from './components/popular-section';

export default function Home() {
    const { trending } = useHome();
    return (
        <main>
            {/* trending movie by week */}
            <HomeHero movies={trending} />

            <PopularSection />
        </main>
    );
}
