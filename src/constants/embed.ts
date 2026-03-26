export const EMBED_SERVERS = [
    {
        id: 'vidlink.pro',
        label: 'VidlinkPro',
        movieUrl: (tmdbId: string) => `https://vidlink.pro/movie/${tmdbId}`,
        episodeUrl: (tmdbId: string, season: number, episode: number) =>
            `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`,
    },
    {
        id: 'vidzen',
        label: 'VidZen',
        movieUrl: (tmdbId: string) => `https://vidzen.fun/movie/${tmdbId}`,
        episodeUrl: (tmdbId: string, season: number, episode: number) =>
            `https://vidzen.fun/tv/${tmdbId}/${season}/${episode}`,
    },
    {
        id: '2embed',
        label: '2Embed',
        movieUrl: (tmdbId: string) => `https://www.2embed.cc/embed/${tmdbId}`,
        episodeUrl: (tmdbId: string, season: number, episode: number) =>
            `https://www.2embed.cc/embedtvfull/${tmdbId}&s=${season}&e=${episode}`,
    },
    // add here
];

export type EmbedServer = (typeof EMBED_SERVERS)[number];
