/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { getDetail, getCredits, getRecommendation, getKeywords, getTrailers } from '@/services/tmdb/media.service';
import { queryKeys } from '@/config/query-keys';
import { apiClient } from '@/config/api-client';

// fetch movie/series detail
export const useMediaDetail = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.movie(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getDetail(type, id);
            return response.data;
        },
        enabled: !!type && !!id,
    });
};

// fetch movie/series credits (cast & crew)
export const useMediaCredits = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.credits(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getCredits(type, id);
            return response.data;
        },
        enabled: !!type && !!id,
    });
};

// fetch movie/series recommendations (similar items)
export const useMediaRecommendations = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.recommendations(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getRecommendation(type, id);
            return response.data.results;
        },
        enabled: !!type && !!id,
    });
};

// fetch movie/series keywords
export const useMediaKeywords = (type?: string, id?: string) => {
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

// fetch movie/series trailers
export const useMediaTrailers = (type?: string, id?: string) => {
    return useQuery({
        queryKey: queryKeys.detail.trailers(type || '', id || ''),
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await getTrailers(type, id);
            return response.data.results;
        },
        enabled: !!type && !!id,
    });
};

// fetch movie/series images (logos, posters, backdrops)
export const useMediaImages = (type?: string, id?: string) => {
    return useQuery({
        queryKey: (type === 'tv' ? queryKeys.images.tv(Number(id)) : queryKeys.images.movie(Number(id))) as any,
        queryFn: async () => {
            if (!type || !id) throw new Error('Type and ID are required');
            const response = await apiClient.get(`/${type}/${id}/images`, {
                params: { include_image_language: 'en,null' },
            });
            return response.data;
        },
        enabled: !!type && !!id,
    });
};
