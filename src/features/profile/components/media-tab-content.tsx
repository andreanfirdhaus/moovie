import { Link } from 'react-router-dom';
import { MediaCard } from '@/components/media/card/media-card';
import type { UserMedia } from '@/library/types';

interface MediaTabContentProps {
    items: UserMedia[];
    isLoading: boolean;
    activeKind: 'watchlist' | 'favorite';
}

export function MediaTabContent({ items, isLoading, activeKind }: MediaTabContentProps) {
    if (isLoading) {
        return (
            <div className='grid grid-cols-2 gap-x-2.5 md:gap-x-3 gap-y-8 sm:grid-cols-4 lg:grid-cols-6'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className='flex flex-col gap-2 animate-pulse'>
                        <div className='aspect-[2/3] w-full rounded-md bg-surface-raised' />
                        <div className='mt-1 space-y-1.5'>
                            <div className='h-[15px] w-4/5 rounded bg-surface-elevated/70' />
                            <div className='h-[14px] w-1/3 rounded bg-surface-elevated/70' />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className='rounded-2xl border border-border-subtle bg-surface-raised p-12 text-center'>
                <p className='text-lg font-semibold text-foreground capitalize'>Your {activeKind} is empty</p>
                <p className='mt-2 text-sm text-foreground-muted'>
                    Save movies or TV series while browsing and they will appear here.
                </p>
                <div className='mt-6'>
                    <Link
                        to='/discover'
                        className='inline-flex items-center justify-center rounded-full bg-primary-muted border border-primary px-5 py-2.5 text-sm font-medium text-primary-accent hover:bg-primary/20 transition-colors'>
                        Explore Content
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-2 gap-x-2.5 gap-y-8 sm:grid-cols-4 lg:grid-cols-6'>
            {items.map((item) => (
                <Link key={item.id} to={`/${item.media_type}/${item.media_id}`}>
                    <MediaCard
                        type={
                            {
                                id: item.media_id,
                                title: item.title,
                                poster_path: item.poster_path ?? '',
                                vote_average: item.vote_average ?? 0,
                                release_date: item.release_date ?? '',
                            } as never
                        }
                    />
                </Link>
            ))}
        </div>
    );
}
