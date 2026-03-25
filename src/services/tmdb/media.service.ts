import { apiClient } from '@/config/api-client';

export const getDetail = (type: string, id: string) => apiClient.get(`/${type}/${id}`);

export const getCredits = (type: string, id: string) => apiClient.get(`/${type}/${id}/credits`);

export const getTrailers = (type: string, id: string) => apiClient.get(`/${type}/${id}/videos`);

export const getReviews = (type: string, id: string) => apiClient.get(`/${type}/${id}/reviews`);

export const getRecommendation = (type: string, id: string) => apiClient.get(`/${type}/${id}/recommendations`);

export const getSimilar = (type: string, id: string) => apiClient.get(`/${type}/${id}/similar`);

export const getKeywords = (type: string, id: string) => apiClient.get(`/${type}/${id}/keywords`);

export const getTvSeason = (id: string, seasonNumber: number) => apiClient.get(`/tv/${id}/season/${seasonNumber}`);
