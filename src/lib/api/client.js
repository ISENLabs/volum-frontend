import axios from 'axios';
import { auth } from '$lib/stores/auth';

const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// interceptor to add auth token
client.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('paresseux-auth-token='))
            ?.split('=')[1];
        
        if (cookieValue) {
            config.headers['Auth-Token'] = cookieValue;
        }
    }
    return config;
});

// Interceptor pour gérer les erreurs
client.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 403) {
            // Disconnection + redirection
            auth.reset();
            window.location.href = import.meta.env.VITE_LOGIN_URL;
        }
        return Promise.reject(error);
    }
);

export default client;
export const ssr = false;