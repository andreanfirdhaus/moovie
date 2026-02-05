import { axiosInstance } from '../api-host';
import { GetListPayload } from '@/types/tmdb/api-payloads';

// export const getNewReleaseSeries = async (payload: GetListPayload) => {
//     try {
//         const response = await axiosInstance().get(`/tv/latest`, {
//             params: payload,
//         });
//         return response;
//     } catch (error) {
//         console.error('Error fetching new release series:', error);
//         throw error;
//     }
// };

export const getPopularSeries = async (page: number = 1, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/tv/popular`, {
            params: {
                page,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching popular series:', error);
        throw error;
    }
};

export const getTopRatedSeries = async (page: number = 1, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/tv/top_rated`, {
            params: {
                page,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching top rated series:', error);
        throw error;
    }
};

export const getAiringToday = async (payload: GetListPayload) => {
    try {
        const response = await axiosInstance().get('/tv/airing_today', {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error('Error fetching airing today:', error);
        throw error;
    }
};

export const getOnTheAir = async (payload: GetListPayload) => {
    try {
        const response = await axiosInstance().get('/tv/on_the_air', {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error('Error fetching on the air:', error);
        throw error;
    }
};

export const getDiscoverSeries = async (page: number = 1, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/discover/tv`, {
            params: {
                page,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching discover series:', error);
        throw error;
    }
};
