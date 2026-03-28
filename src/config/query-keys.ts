export const queryKeys = {
    movies: {
        all: ['movies'] as const,
        popular: () => [...queryKeys.movies.all, 'popular'] as const,
        trending: () => [...queryKeys.movies.all, 'trending'] as const,
        upcoming: () => [...queryKeys.movies.all, 'upcoming'] as const,
        topRated: () => [...queryKeys.movies.all, 'topRated'] as const,
        nowPlaying: () => [...queryKeys.movies.all, 'nowPlaying'] as const,
        discover: () => [...queryKeys.movies.all, 'discover'] as const,
    },
    series: {
        all: ['series'] as const,
        popular: () => [...queryKeys.series.all, 'popular'] as const,
        topRated: () => [...queryKeys.series.all, 'topRated'] as const,
        airingToday: () => [...queryKeys.series.all, 'airingToday'] as const,
        onTheAir: () => [...queryKeys.series.all, 'onTheAir'] as const,
        discover: () => [...queryKeys.series.all, 'discover'] as const,
    },
    detail: {
        all: ['detail'] as const,
        movie: (type: string, id: string) => [...queryKeys.detail.all, type, id] as const,
        credits: (type: string, id: string) => [...queryKeys.detail.all, type, id, 'credits'] as const,
        recommendations: (type: string, id: string) => [...queryKeys.detail.all, type, id, 'recommendations'] as const,
        keywords: (type: string, id: string) => [...queryKeys.detail.all, type, id, 'keywords'] as const,
        trailers: (type: string, id: string) => [...queryKeys.detail.all, type, id, 'trailers'] as const,
        reviews: (type: string, id: string) => [...queryKeys.detail.all, type, id, 'reviews'] as const,
        tvSeason: (id: string, seasonNumber: number) =>
            [...queryKeys.detail.all, 'tv', id, 'season', seasonNumber] as const,
    },
    popular: {
        all: ['popular'] as const,
        streaming: () => [...queryKeys.popular.all, 'streaming'] as const,
        onTV: () => [...queryKeys.popular.all, 'onTV'] as const,
        inTheaters: () => [...queryKeys.popular.all, 'inTheaters'] as const,
    },
    genres: {
        all: ['genres'] as const,
        movies: () => [...queryKeys.genres.all, 'movies'] as const,
        tv: () => [...queryKeys.genres.all, 'tv'] as const,
    },
    search: {
        all: ['search'] as const,
        multi: (query: string, page: number) => [...queryKeys.search.all, 'multi', query, page] as const,
        movies: (query: string, page: number) => [...queryKeys.search.all, 'movies', query, page] as const,
        series: (query: string, page: number) => [...queryKeys.search.all, 'series', query, page] as const,
    },
    person: {
        all: ['person'] as const,
        detail: (id: number) => [...queryKeys.person.all, id, 'detail'] as const,
        knownFor: (id: number) => [...queryKeys.person.all, id, 'known-for'] as const,
    },
};
