import { MediaHero } from '@/components/media/hero';
import { PopularSection } from './components/popular-section';
import MediaCollection from '@/components/media/media-collection';

export default function Home() {
    return (
        <main className='pb-16'>
            {/* Trending all (movies & TV series) by week */}
            <MediaHero mediaType='all' timeWindow='week' />

            <div className='mt-8 sm:mt-10 space-y-6'>
                <PopularSection />

                <MediaCollection title='Anime' mediaType='tv' genreIds={[16, 10759]} watchProvider={337} country='JP' />
            </div>
        </main>
    );
}
