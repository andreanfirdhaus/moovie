import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getDiscoverMovies, getNowPlayingMovies } from '@/services/tmdb/movie.service';
import { getDiscoverSeries } from '@/services/tmdb';
import { TMDB_PARAMS } from '@/config/params';

export type PopularFilter = 'streaming' | 'on-tv' | 'in-theaters';

const params = {
    with_watch_monetization_types: 'flatrate',
    watch_region: TMDB_PARAMS.region,
    with_watch_providers: 8, // netflix
    'first_air_date.gte': '2016-01-01',
};

export const useStreaming = () =>
    useQuery({
        queryKey: queryKeys.popular.streaming(),
        queryFn: async () => {
            const [movieRes, tvRes] = await Promise.all([getDiscoverMovies(1, params), getDiscoverSeries(1, params)]);

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
            const res = await getDiscoverSeries(1, {
                with_watch_monetization_types: 'flatrate',
                watch_region: TMDB_PARAMS.region,
                sort_by: 'popularity.desc',
                without_genres: '16', // animation
                'vote_average.gte': 6,
                'vote_count.gte': 50,
                'first_air_date.gte': '2017-01-01',
                with_watch_providers: 8, // netflix
            });
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
