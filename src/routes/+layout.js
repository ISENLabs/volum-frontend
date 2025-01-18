import { auth } from '$lib/stores/auth';
import { redirect } from '@sveltejs/kit';

export const ssr = false; // disable ssr as we need to access browser cookies

export async function load({ url }) {
    const isAuthenticated = await auth.checkAuth();

    if (!isAuthenticated) {
        const loginUrl = import.meta.env.VITE_LOGIN_URL;
        throw redirect(302, loginUrl);
    }

    return {};
}
