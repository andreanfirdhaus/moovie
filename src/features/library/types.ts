export type LibraryKind = 'watchlist' | 'favorite';

export interface UserMedia {
    id: string;
    media_id: number;
    media_type: 'movie' | 'tv';
    title: string;
    poster_path: string | null;
    vote_average: number | null;
    release_date: string | null;
    kind: LibraryKind;
}
