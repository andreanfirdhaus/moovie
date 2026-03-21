import { apiClient } from '@/config/api-client';
import type { GetListPayload } from '@/types/tmdb/api-payloads';

export const getPopularMovies = (page = 1, payload?: GetListPayload) =>
    apiClient.get('/movie/popular', { params: { page, ...payload } });

export const getTopRatedMovies = (page = 1, payload?: GetListPayload) =>
    apiClient.get('/movie/top_rated', { params: { page, ...payload } });

export const getTrendingMovies = (payload?: GetListPayload) =>
    apiClient.get('/trending/movie/week', { params: payload });

export const getTrendingAll = (type: string, payload?: GetListPayload) =>
    apiClient.get(`/trending/all/${type}`, { params: payload });

export const getNowPlayingMovies = (payload?: GetListPayload) =>
    apiClient.get('/movie/now_playing', { params: payload });

export const getUpcomingMovies = (page = 1, payload?: GetListPayload) =>
    apiClient.get('/movie/upcoming', { params: { page, ...payload } });

export const getDiscoverMovies = (page = 1, payload?: GetListPayload) =>
    apiClient.get('/discover/movie', { params: { page, ...payload } });
