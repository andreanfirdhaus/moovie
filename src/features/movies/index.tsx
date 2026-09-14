import { MediaHero } from '@/components/media/hero';
import MediaCollection from '@/components/media/media-collection';

export default function MoviesPage() {
    return (
        <main className='min-h-screen pb-16'>
            <MediaHero mediaType='movie' timeWindow='day' />

            <div className='mt-8 sm:mt-10 space-y-6'>
                <MediaCollection mediaType='movie' genreId={28} title='Action Movies' />
            </div>
        </main>
    );
}
