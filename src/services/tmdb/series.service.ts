import { apiClient } from '@/config/api-client';
import type { GetListPayload } from '@/types/tmdb/api-payloads';

export const getPopularSeries = (page = 1, payload?: GetListPayload) =>
    apiClient.get('/tv/popular', { params: { page, ...payload } });

export const getTopRatedSeries = (page = 1, payload?: GetListPayload) =>
    apiClient.get('/tv/top_rated', { params: { page, ...payload } });

export const getAiringToday = (payload?: GetListPayload) => apiClient.get('/tv/airing_today', { params: payload });

export const getOnTheAir = (payload?: GetListPayload) => apiClient.get('/tv/on_the_air', { params: payload });

export const getDiscoverSeries = (page = 1, payload?: GetListPayload) =>
    apiClient.get('/discover/tv', { params: { page, ...payload } });
