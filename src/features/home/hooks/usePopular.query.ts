import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getDiscoverMovies, getNowPlayingMovies } from '@/services/tmdb/movie.service';
import { getDiscoverSeries } from '@/services/tmdb';
import { TMDB_PARAMS } from '@/config/params';

export type PopularFilter = 'streaming' | 'on-tv' | 'in-theaters';

const streamingParams = {
    with_watch_monetization_types: 'flatrate',
    watch_region: TMDB_PARAMS.region,
    with_watch_providers: '8|337|119', // netflix|disney+|prime
    sort_by: 'popularity.desc',
    'vote_average.gte': 6,
    'vote_count.gte': 100,
    'primary_release_date.gte': '2018-01-01',
};

const onTVParams = {
    with_watch_monetization_types: 'free|ads',
    watch_region: TMDB_PARAMS.region,
    sort_by: 'popularity.desc',
    without_genres: '16',
    'vote_average.gte': 6,
    'vote_count.gte': 70,
    'first_air_date.gte': '2017-01-01',
};

export const useStreaming = () =>
    useQuery({
        queryKey: queryKeys.popular.streaming(),
        queryFn: async () => {
            const [movieRes, tvRes] = await Promise.all([
                getDiscoverMovies(1, streamingParams),
                getDiscoverSeries(1, streamingParams),
            ]);

            const movies = movieRes.data.results.slice(0, 10);
            const tv = tvRes.data.results.slice(0, 10);

            const merged: any[] = [];
            for (let i = 0; i < 10; i++) {
                if (movies[i]) merged.push(movies[i]);
                if (tv[i]) merged.push(tv[i]);
            }
            return merged;
        },
        staleTime: 1000 * 60 * 10,
    });

export const useOnTVSeries = () =>
    useQuery({
        queryKey: queryKeys.popular.onTV(),
        queryFn: async () => {
            const res = await getDiscoverSeries(1, onTVParams);
            return res.data.results;
        },
        staleTime: 1000 * 60 * 10,
    });

export const useInTheatersMovies = () =>
    useQuery({
        queryKey: queryKeys.popular.inTheaters(),
        queryFn: async () => {
            const res = await getNowPlayingMovies();
            return res.data.results;
        },
        staleTime: 1000 * 60 * 10,
    });
