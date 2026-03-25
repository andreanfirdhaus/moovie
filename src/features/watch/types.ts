import type { ServerStatus } from './hooks/useStreamResolver';
import type { StreamSeason } from '@/types/stream';
import type { Seasons } from '@/types/tmdb/media-detail';

export interface PageState {
    id: string;
    tmdbId?: string;
    title: string;
    year: string;
    type: string;
    playerUrl?: string;
    seasons?: StreamSeason[];
    tmdbSeasons?: Seasons[];
}

export interface ServerOption {
    id: string;
    label: string;
    badge?: string;
    status: ServerStatus;
    error?: string | null;
}
