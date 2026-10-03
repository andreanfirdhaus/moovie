import axios from 'axios';
import { getTmdbLanguage } from '@/constants/languages';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
});

apiClient.interceptors.request.use((config) => {
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem('moovie_language') || 'en' : 'en';
    const tmdbLanguage = getTmdbLanguage(savedLang);

    config.params = {
        language: tmdbLanguage,
        ...config.params,
    };

    return config;
});
