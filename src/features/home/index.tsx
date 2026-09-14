import { MediaHero } from '@/components/media/hero';
import { PopularSection } from './components/popular-section';

export default function Home() {
    return (
        <main className='pb-16'>
            {/* Trending all (movies & TV series) by week */}
            <MediaHero mediaType='all' timeWindow='week' />

            <div className='mt-8 sm:mt-10 space-y-6'>
                <PopularSection />
            </div>
        </main>
    );
}
