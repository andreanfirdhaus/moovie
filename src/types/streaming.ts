export interface StreamingSearchItem {
    title: string;
    year: string;
    type: string;
    detailPath: string;
}

export interface StreamingSearchResponse {
    success: boolean;
    items: StreamingSearchItem[];
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
