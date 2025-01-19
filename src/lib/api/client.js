import axios from 'axios';
import { auth } from '$lib/stores/auth';

const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Auth-Token': typeof window !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('paresseux-auth-token='))?.split('=')[1] || '' : ''
    }
});

// Interceptor to handle errors
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