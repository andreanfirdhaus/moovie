import { axiosInstance } from '../api-host';
import { GetListPayload } from '@/types/tmdb/api-payloads';

export const searchMulti = async (query: string, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/search/multi`, {
            params: {
                query,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
};

export const searchMovies = async (query: string, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/search/movie`, {
            params: {
                query,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

export const searchSeries = async (query: string, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/search/tv`, {
            params: {
                query,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error searching series:', error);
        throw error;
    }
};
