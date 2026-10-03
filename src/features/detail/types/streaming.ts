import type { Seasons } from '@/types/tmdb/media-detail';

export type ServerStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ServerOption {
    id: string;
    label: string;
    badge?: string;
    status: ServerStatus;
    error?: string | null;
}

export interface StreamingState {
    type?: string;
    id?: string;
    tmdbId?: string;
    seasons: Seasons[];
}
