import { writable } from 'svelte/store';
import client from '../api/client';

const createAuthStore = () => {
    const { subscribe, set, update } = writable({
        user: null,
        loading: true,
        initialized: false
    });

    return {
        subscribe,
        checkAuth: async () => {
            try {
                const response = await client.get(import.meta.env.VITE_BACKEND_URL+'/user');
                if (response.data.success) {
                    update(state => ({ ...state, user: response.data.data, loading: false, initialized: true }));
                    return true;
                }
                update(state => ({ ...state, user: null, loading: false, initialized: true }));
                return false;
            } catch (error) {
                update(state => ({ ...state, user: null, loading: false, initialized: true }));
                return false;
            }
        },
        reset: () => {
            set({ user: null, loading: false, initialized: true });
        }
    };
}

export const auth = createAuthStore();
export default auth;
