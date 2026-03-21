export interface TmdbEpisode {
    id: number;
    name: string;
    overview: string;
    episode_number: number;
    season_number: number;
    still_path: string | null;
    air_date: string;
    runtime: number | null;
    vote_average: number;
}
