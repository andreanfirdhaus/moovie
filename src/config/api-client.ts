import axios from 'axios';
import { DEFAULT_PARAMS } from './params';

// AccessToken
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
    params: DEFAULT_PARAMS,
});

// ApiKey
// export const apiClient = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     params: DEFAULT_PARAMS,
// });
