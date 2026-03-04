import { apiClient } from '@/config/api-client';

export const getMovieGenres = () => apiClient.get('/genre/movie/list');

export const getTVGenres = () => apiClient.get('/genre/tv/list');
