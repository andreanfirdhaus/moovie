export interface StreamSearchItem {
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

export interface StreamSearchResponse {
    success: boolean;
    items: StreamSearchItem[];
    total: number;
    page: number;
    hasMore: boolean;
}

export interface StreamCategoryResponse {
    success: boolean;
    items: StreamSearchItem[];
    total: number;
    page: number;
    hasMore: boolean;
}

export interface StreamEpisode {
    episode: number;
    title: string;
    cover: string;
    playerUrl: string;
}

export interface StreamSeason {
    season: number;
    episodes: StreamEpisode[];
    totalEpisodes: number;
}

export interface StreamDetailData {
    playerUrl: string;
    detailPath: string;
    seasons: StreamSeason[];
}

export interface StreamDetailResponse {
    success: boolean;
    data: StreamDetailData;
}

export interface WatchState {
    title: string;
    year: string;
    type: string;
    id: string;
    playerUrl: string;
    seasons?: StreamSeason[];
}
