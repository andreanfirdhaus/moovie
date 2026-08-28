import axios from 'axios';
import { getCountryByCode, getSelectedCountryCode } from '@/constants/countries';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
});

apiClient.interceptors.request.use((config) => {
    const countryCode = getSelectedCountryCode();
    const country = getCountryByCode(countryCode);

    config.params = {
        language: country.language,
        ...(country.code !== 'ALL' && {
            region: country.code,
        }),
        ...config.params,
    };

    return config;
});
