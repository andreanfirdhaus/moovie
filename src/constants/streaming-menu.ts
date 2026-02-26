export interface StreamingMenuItem {
    label: string;
    action: string;
}

export const streamingMenu: StreamingMenuItem[] = [
    { label: 'Trending', action: 'trending' },
    { label: 'Indonesian Movies', action: 'indonesian-movies' },
    { label: 'Indonesian Drama', action: 'indonesian-drama' },
    { label: 'K-Drama', action: 'kdrama' },
    { label: 'Short TV', action: 'short-tv' },
    { label: 'Anime', action: 'anime' },
];
