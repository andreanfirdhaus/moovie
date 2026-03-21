export const EMBED_SERVERS = [
    {
        id: 'autoembed',
        label: 'AutoEmbed',
        movieUrl: (tmdbId: string) => `https://player.autoembed.cc/embed/movie/${tmdbId}`,
        episodeUrl: (tmdbId: string, season: number, episode: number) =>
            `https://player.autoembed.cc/embed/tv/${tmdbId}/${season}/${episode}`,
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
