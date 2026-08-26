import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';
import { useAuth } from '@/features/auth/context';
import type { LibraryKind, UserMedia } from './types';

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

export async function getUserMedia(userId: string, kind: LibraryKind | 'all' = 'all') {
    let query = supabase.from('user_media').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (kind !== 'all') query = query.eq('kind', kind);
    const { data, error } = await query;
    return { data: (data ?? []) as UserMedia[], error };
}
