import { axiosInstance } from '../api-host';
import { GetListPayload } from '@/types/tmdb/api-payloads';

// export const getNewReleaseMovies = async (payload: GetListPayload) => {
//     try {
//         const response = await axiosInstance().get(`/movie/latest`, {
//             params: payload,
//         });
//         return response;
//     } catch (error) {
//         console.error('Error fetching new release movies:', error);
//         throw error;
//     }
// };

export const getPopularMovies = async (page: number = 1, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/movie/popular`, {
            params: {
                page,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

export const getTopRatedMovies = async (page: number = 1, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/movie/top_rated`, {
            params: {
                page,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        throw error;
    }
};

export const getTrendingMovies = async (payload: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/trending/movie/week`, {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
};

export const getTrendingAll = async (type: string, payload: object) => {
    try {
        const response = await axiosInstance().get(`/trending/all/${type}`, {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error('Error fetching trending:', error);
        throw error;
    }
};

export const getNowPlayingMovies = async (payload: GetListPayload) => {
    try {
        const response = await axiosInstance().get('/movie/now_playing', {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        throw error;
    }
};

export const getUpcomingMovies = async (page: number = 1, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get('/movie/upcoming', {
            params: {
                page,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        throw error;
    }
};

export const getDiscoverMovies = async (page: number = 1, payload?: GetListPayload) => {
    try {
        const response = await axiosInstance().get(`/discover/movie`, {
            params: {
                page,
                ...payload,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching discover movies:', error);
        throw error;
    }
};
