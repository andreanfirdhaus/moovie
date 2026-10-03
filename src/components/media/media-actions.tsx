import { Bookmark, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authContext';
import type { MediaDetail } from '@/types/tmdb/media-detail';
import { getMediaTitle, getMediaType } from '@/utils/media';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';
import type { LibraryKind } from '@/types/user';

interface MediaInput {
    mediaId: number;
    mediaType: 'movie' | 'tv';
    title: string;
    posterPath?: string | null;
    voteAverage?: number | null;
    releaseDate?: string | null;
}

export function useMediaLibrary(media?: Pick<MediaInput, 'mediaId' | 'mediaType'>) {
    const { user } = useAuth();
    const [saved, setSaved] = useState<LibraryKind[]>([]);
    const [isLoading, setIsLoading] = useState(Boolean(media));

    const load = useCallback(async () => {
        if (!user || !media) {
            setSaved([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const { data } = await supabase
            .from('user_media')
            .select('kind')
            .eq('user_id', user.id)
            .eq('media_id', media.mediaId)
            .eq('media_type', media.mediaType);
        setSaved((data ?? []).map((item) => item.kind as LibraryKind));
        setIsLoading(false);
    }, [media, user]);

    useEffect(() => {
        load();
    }, [load]);

    const toggle = async (kind: LibraryKind, input: MediaInput) => {
        if (!user) return false;
        if (saved.includes(kind)) {
            const { error } = await supabase
                .from('user_media')
                .delete()
                .eq('user_id', user.id)
                .eq('media_id', input.mediaId)
                .eq('media_type', input.mediaType)
                .eq('kind', kind);
            if (!error) setSaved((current) => current.filter((value) => value !== kind));
            return !error;
        }

        const { error } = await supabase.from('user_media').upsert(
            {
                user_id: user.id,
                media_id: input.mediaId,
                media_type: input.mediaType,
                title: input.title,
                poster_path: input.posterPath ?? null,
                vote_average: input.voteAverage ?? null,
                release_date: input.releaseDate || null,
                kind,
            },
            { onConflict: 'user_id,media_id,media_type,kind' }
        );
        if (!error) setSaved((current) => [...current, kind]);
        return !error;
    };

    return { saved, isLoading, toggle };
}

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
                        'bg-primary-muted border border-primary text-primary-accent hover:bg-primary/20 hover:text-primary-hover px-3.5 py-3'
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
                        'bg-primary-muted border border-primary text-primary-accent hover:bg-primary/20 hover:text-primary-hover px-3.5 py-3'
                    :   'bg-surface-raised border border-border-subtle text-foreground-secondary hover:bg-surface-hover hover:text-foreground px-3.5 py-3'
                }>
                <Heart size={16} fill={saved.includes('favorite') ? 'currentColor' : 'none'} />
                <span className='text-sm font-medium'>{saved.includes('favorite') ? 'Favorited' : 'Favorite'}</span>
            </Button>
        </>
    );
}
