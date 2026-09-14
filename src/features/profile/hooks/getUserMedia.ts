import { supabase } from '@/config/supabase';
import type { LibraryKind, UserMedia } from '@/types/user';

export async function getUserMedia(userId: string, kind: LibraryKind | 'all' = 'all') {
    let query = supabase.from('user_media').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (kind !== 'all') query = query.eq('kind', kind);
    const { data, error } = await query;
    return { data: (data ?? []) as UserMedia[], error };
}
