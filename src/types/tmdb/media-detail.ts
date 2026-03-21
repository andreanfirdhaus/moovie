export interface MediaDetail {
    adult: boolean;
    backdrop_path: string;
    budget?: number;
    created_by?: CreatedBy[];
    episode_run_time?: number[];
    first_air_date?: string;
    genres: Genres[];
    homepage: string;
    id: number;
    in_production?: boolean;
    imdb_id?: string;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: LastEpisodeAir;
    name?: string;
    network?: Network[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    original_language: string;
    original_title?: string;
    original_name?: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompanies[];
    production_countries: ProductionCountries[];
    release_date: string;
    revenue: number;
    runtime: number;
    seasons?: Seasons[];
    spoken_languages: SpokenLanguages[];
    status: string;
    tagline: string;
    title?: string;
    type?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
    media_type: string;
}

interface Genres {
    id: number;
    name: string;
}

interface ProductionCompanies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ProductionCountries {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface CreatedBy {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    profile_path: string;
}

interface LastEpisodeAir {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}

interface Network {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface Seasons {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}
