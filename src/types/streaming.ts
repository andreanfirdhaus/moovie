export interface StreamingSearchItem {
    id: string;
    title: string;
    poster: string;
    rating: number;
    year: string;
    type: string;
    detailPath: string;
    genre: string;
    description: string;
}

export interface StreamingSearchResponse {
    success: boolean;
    items: StreamingSearchItem[];
    total: number;
    page: number;
    hasMore: boolean;
}

export interface StreamingCategoryResponse {
    success: boolean;
    items: StreamingSearchItem[];
    total: number;
    page: number;
    hasMore: boolean;
}

export interface StreamingEpisode {
    episode: number;
    title: string;
    cover: string;
    playerUrl: string;
}

export interface StreamingSeason {
    season: number;
    episodes: StreamingEpisode[];
    totalEpisodes: number;
}

export interface StreamingDetailData {
    playerUrl: string;
    detailPath: string;
    seasons: StreamingSeason[];
}

export interface StreamingDetailResponse {
    success: boolean;
    data: StreamingDetailData;
}

/** Passed via react-router state to the watch page */
export interface WatchState {
    title: string;
    playerUrl: string;
    seasons?: StreamingSeason[];
}
