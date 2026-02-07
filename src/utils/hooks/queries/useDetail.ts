import { useQuery } from '@tanstack/react-query';
import { getDetail, getCredits, getRecommendation, getKeywords, getTrailers } from '@/api/detail/route';
import { queryKeys } from './query-keys';

//  fetch movie/series detail
export const useMovieDetail = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.movie(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getDetail(type, id, {});
            return response.data;
        },
        enabled: !!type && !!id,
    });
};

//  fetch movie/series credits (cast & crew)
export const useMovieCredits = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.credits(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getCredits(type, id, {});
            return response.data.cast;
        },
        enabled: !!type && !!id,
    });
};

//  fetch movie/series recommendations (similar items)
export const useMovieRecommendations = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.recommendations(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getRecommendation(type, id, {});
            return response.data.results;
        },
        enabled: !!type && !!id,
    });
};

//  fetch movie/series keywords
export const useMovieKeywords = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.keywords(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getKeywords(type, id);
            // Different structure for movies vs TV series
            const keywordsData = type === 'movie' ? response.data.keywords : response.data.results;
            return keywordsData || [];
        },
        enabled: !!type && !!id,
    });
};

//  fetch movie/series trailers
export const useMovieTrailers = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.trailers(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getTrailers(type, id, {});
            return response.data.results;
        },
        enabled: !!type && !!id,
    });
};

// fetch movie/series reviews
// export const useMovieReviews = (type?: string, id?: string) => {
//     return useQuery({
//         queryKey: queryKeys.detail.reviews(type || '', id || ''),
//         queryFn: async () => {
//             if (!type || !id) throw new Error('Type and ID are required');
//             const response = await getReviews(type, id, {});
//             return response.data.results;
//         },
//         enabled: !!type && !!id,
//     });
// };
