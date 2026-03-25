import type { GetListPayload } from '@/types/tmdb/api-payloads';

export const TMDB_PARAMS = {
    region: 'ID',
    // language: 'id-ID',
};

export const DEFAULT_PARAMS: GetListPayload = {
    region: TMDB_PARAMS.region,
    // language: TMDB_PARAMS.language,
} as const;
