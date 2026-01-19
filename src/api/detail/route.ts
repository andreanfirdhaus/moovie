import { axiosInstance } from '../api-host';
import { DetailPayload } from '@/types/tmdb/api-payloads';

export const getDetail = async (type: string, id: string, payload: DetailPayload) => {
    try {
        const response = await axiosInstance().get(`/${type}/${id}`, {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error(`Error fetching ${type} detail:`, error);
        throw error;
    }
};

export const getCredits = async (type: string, id: string, payload: DetailPayload) => {
    try {
        const response = await axiosInstance().get(`/${type}/${id}/credits`, {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error(`Error fetching ${type} credits:`, error);
        throw error;
    }
};

export const getTrailers = async (type: string, id: string, payload: DetailPayload) => {
    try {
        const response = await axiosInstance().get(`/${type}/${id}/videos`, {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error(`Error fetching ${type} trailers:`, error);
        throw error;
    }
};

export const getReviews = async (type: string, id: string, payload: DetailPayload) => {
    try {
        const response = await axiosInstance().get(`/${type}/${id}/reviews`, {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error(`Error fetching ${type} reviews:`, error);
        throw error;
    }
};

export const getRecommendation = async (type: string, id: string, payload: DetailPayload) => {
    try {
        const response = await axiosInstance().get(`/${type}/${id}/similar`, {
            params: payload,
        });
        return response;
    } catch (error) {
        console.error(`Error fetching ${type} recommendations:`, error);
        throw error;
    }
};

export const getKeywords = async (type: string, id: string) => {
    try {
        const response = await axiosInstance().get(`/${type}/${id}/keywords`);
        return response;
    } catch (error) {
        console.log(`Error fetching ${type} keywords:`, error);
        throw error;
    }
};
