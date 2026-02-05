import { axiosInstance } from '../api-host';

export const getMovieGenres = async () => {
    try {
        const response = await axiosInstance().get('/genre/movie/list');
        return response;
    } catch (error) {
        console.error('Error fetching movie genres:', error);
        throw error;
    }
};

export const getTVGenres = async () => {
    try {
        const response = await axiosInstance().get('/genre/tv/list');
        return response;
    } catch (error) {
        console.error('Error fetching TV genres:', error);
        throw error;
    }
};
