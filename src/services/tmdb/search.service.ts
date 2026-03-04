import { apiClient } from '@/config/api-client';
import type { GetListPayload } from '@/types/tmdb/api-payloads';

export const searchMulti = (query: string, page = 1, payload?: GetListPayload) =>
    apiClient.get('/search/multi', { params: { query, page, ...payload } });

export const searchMovies = (query: string, page = 1, payload?: GetListPayload) =>
    apiClient.get('/search/movie', { params: { query, page, ...payload } });

export const searchSeries = (query: string, page = 1, payload?: GetListPayload) =>
    apiClient.get('/search/tv', { params: { query, page, ...payload } });
