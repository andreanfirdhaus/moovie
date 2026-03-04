import { apiClient } from '@/config/api-client';
import type { DetailPayload } from '@/types/tmdb/api-payloads';

export const getDetail = (type: string, id: string, payload: DetailPayload) =>
    apiClient.get(`/${type}/${id}`, { params: payload });

export const getCredits = (type: string, id: string, payload: DetailPayload) =>
    apiClient.get(`/${type}/${id}/credits`, { params: payload });

export const getTrailers = (type: string, id: string, payload: DetailPayload) =>
    apiClient.get(`/${type}/${id}/videos`, { params: payload });

export const getReviews = (type: string, id: string, payload: DetailPayload) =>
    apiClient.get(`/${type}/${id}/reviews`, { params: payload });

export const getRecommendation = (type: string, id: string, payload: DetailPayload) =>
    apiClient.get(`/${type}/${id}/similar`, { params: payload });

export const getKeywords = (type: string, id: string) => apiClient.get(`/${type}/${id}/keywords`);
