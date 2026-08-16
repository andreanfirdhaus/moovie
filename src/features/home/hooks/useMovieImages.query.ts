import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getMovieImages } from '@/services/tmdb/movie.service';

export const useMovieImages = (movieId?: number, options?: any) => {
    return useQuery({
        queryKey: movieId ? queryKeys.images.movie(movieId) : queryKeys.images.all,
        queryFn: async () => {
            if (!movieId) return null;
            const res = await getMovieImages(movieId, { include_image_language: 'en,null' });
            return res.data;
        },
        enabled: !!movieId,
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 24,
        ...options,
    });
};

export default useMovieImages;
