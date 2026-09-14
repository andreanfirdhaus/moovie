import { MediaHero } from '@/components/media/hero';
import { GenreCollection } from '@/components/media/media-collection';

export default function TVSeriesPage() {
    return (
        <main className='min-h-screen pb-16'>
            <MediaHero mediaType='tv' timeWindow='day' />

            <div className='mt-8 sm:mt-10 space-y-6'>
                <GenreCollection mediaType='tv' genreId={18} genreName='Drama Series' />
            </div>
        </main>
    );
}
