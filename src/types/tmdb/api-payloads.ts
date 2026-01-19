export interface GetListPayload {
    page?: number;
    language?: string;
    region?: string;
    sort_by?: string;
    with_genres?: string;
}

export interface DetailPayload {
    language?: string;
}
