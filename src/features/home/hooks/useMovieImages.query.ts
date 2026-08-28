import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/query-keys';
import { getMovieImages } from '@/services/tmdb/movie.service';
import { getSeriesImages } from '@/services/tmdb/series.service';

export const useMediaImages = (id?: number, mediaType: 'movie' | 'tv' = 'movie', options?: any) => {
    return useQuery({
        queryKey:
            id ?
                mediaType === 'tv' ?
                    queryKeys.images.tv(id)
                :   queryKeys.images.movie(id)
            :   queryKeys.images.all,
        queryFn: async () => {
            if (!id) return null;
            const res =
                mediaType === 'tv' ?
                    await getSeriesImages(id, { include_image_language: 'en,null' })
                :   await getMovieImages(id, { include_image_language: 'en,null' });
            return res.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 60,
        ...options,
    });
};

export const useMovieImages = (movieId?: number, options?: any) => useMediaImages(movieId, 'movie', options);

export default useMediaImages;
