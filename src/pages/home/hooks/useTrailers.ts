import { useQuery } from '@tanstack/react-query';
import { getTrailers } from '@/api/detail/route';
import { getMovieTitle } from '@/utils/helper/tmdb-helpers';
import { useTrendingMoviesWithDetails } from '@/utils/hooks/queries/useMovies';

export interface Trailer {
    key: string;
    name: string;
    movieTitle: string;
    mediaType: string;
    movieId: number;
}

export const useTrendingTrailers = () => {
    const { data: trendingMovies = [] } = useTrendingMoviesWithDetails();

    return useQuery({
        queryKey: ['trending-trailers'],
        queryFn: async () => {
            const trailersData: Trailer[] = [];

            // Fetch trailers from first 10 trending items
            for (const movie of trendingMovies.slice(0, 10)) {
                try {
                    const response = await getTrailers(movie.media_type, movie.id.toString(), {});
                    const videos = response.data.results;

                    // Filter for YouTube trailers only
                    const trailer = videos.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');

                    if (trailer) {
                        trailersData.push({
                            key: trailer.key,
                            name: trailer.name,
                            movieTitle: getMovieTitle(movie),
                            mediaType: movie.media_type,
                            movieId: movie.id,
                        });
                    }
                } catch (error) {
                    console.error(`Error fetching trailer for ${movie.id}:`, error);
                }
            }

            return trailersData;
        },
        enabled: trendingMovies.length > 0,
    });
};
