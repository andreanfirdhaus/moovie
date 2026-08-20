export const EMBED_SERVERS = [
    {
        id: 'vidlink.pro',
        label: 'Server 1',
        movieUrl: (tmdbId: string) => `https://vidlink.pro/movie/${tmdbId}`,
        episodeUrl: (tmdbId: string, season: number, episode: number) =>
            `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`,
    },
    {
        id: 'vidzen',
        label: 'Server 2',
        movieUrl: (tmdbId: string) => `https://vidzen.fun/movie/${tmdbId}`,
        episodeUrl: (tmdbId: string, season: number, episode: number) =>
            `https://vidzen.fun/tv/${tmdbId}/${season}/${episode}`,
    },
    {
        id: '2embed',
        label: 'Server 3',
        movieUrl: (tmdbId: string) => `https://www.2embed.cc/embed/${tmdbId}`,
        episodeUrl: (tmdbId: string, season: number, episode: number) =>
            `https://www.2embed.cc/embedtvfull/${tmdbId}&s=${season}&e=${episode}`,
    },
    // add here
];

export type EmbedServer = (typeof EMBED_SERVERS)[number];
