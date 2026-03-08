import axios from 'axios';

// AccessToken
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
});

// ApiKey
// export const apiClient = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     params: {
//         api_key: API_KEY,
//     },
// });
