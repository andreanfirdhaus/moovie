import type { Seasons } from '@/types/tmdb/media-detail';

export type ServerStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface PageState {
    id: string;
    tmdbId?: string;
    title: string;
    year: string;
    type: string;
    tmdbSeasons?: Seasons[];
}

export interface ServerOption {
    id: string;
    label: string;
    badge?: string;
    status: ServerStatus;
    error?: string | null;
}
