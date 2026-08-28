import { Bookmark, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/context';
import { useMediaLibrary } from '../use-media-library';
import type { MediaDetail } from '@/types/tmdb/media-detail';
import { getMediaTitle, getMediaType } from '@/utils/media';

export default function MediaActions({ detail }: { detail: MediaDetail }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const mediaType = getMediaType(detail);
    const { saved, toggle } = useMediaLibrary({ mediaId: detail.id, mediaType });
    const input = {
        mediaId: detail.id,
        mediaType,
        title: getMediaTitle(detail),
        posterPath: detail.poster_path,
        voteAverage: Number(detail.vote_average),
        releaseDate: detail.release_date || detail.first_air_date,
    };

    const handleToggle = (kind: 'watchlist' | 'favorite') => {
        if (!user) {
            navigate('/login');
            return;
        }
        void toggle(kind, input);
    };

    return (
        <>
            <Button
                aria-label='Add to watchlist'
                onClick={() => handleToggle('watchlist')}
                variant='ghost'
                rounded='lg'
                className={
                    saved.includes('watchlist') ?
                        'bg-primary-muted text-primary-accent border border-primary-accent/30 px-3.5 py-3'
                    :   'bg-surface-raised border border-border-subtle text-foreground-secondary hover:bg-surface-hover hover:text-foreground px-3.5 py-3'
                }>
                <Bookmark size={16} fill={saved.includes('watchlist') ? 'currentColor' : 'none'} />
                <span className='text-sm font-medium'>
                    {saved.includes('watchlist') ? 'In watchlist' : 'Watchlist'}
                </span>
            </Button>

            <Button
                aria-label='Add to favorite'
                onClick={() => handleToggle('favorite')}
                variant='ghost'
                rounded='lg'
                className={
                    saved.includes('favorite') ?
                        'bg-primary-muted text-primary-accent border border-primary-accent/30 px-3.5 py-3'
                    :   'bg-surface-raised border border-border-subtle text-foreground-secondary hover:bg-surface-hover hover:text-foreground px-3.5 py-3'
                }>
                <Heart size={16} fill={saved.includes('favorite') ? 'currentColor' : 'none'} />
                <span className='text-sm font-medium'>{saved.includes('favorite') ? 'Favorited' : 'Favorite'}</span>
            </Button>
        </>
    );
}
