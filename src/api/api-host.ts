import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosInstance = () =>
    axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            api_key: API_KEY,
        },
    });
