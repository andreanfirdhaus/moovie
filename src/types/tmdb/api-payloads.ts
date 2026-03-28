export interface GetListPayload {
    page?: number;
    language?: string;
    region?: string;
    sort_by?: string;
    with_genres?: string;
    with_origin_country?: string;
    with_watch_monetization_types?: string;
    watch_region?: string;
    with_watch_providers?: number | string;
    without_genres?: string;
    'vote_average.gte'?: number;
    'vote_count.gte'?: number;
    'first_air_date.gte'?: string;
}

export interface DetailPayload {
    language?: string;
}
