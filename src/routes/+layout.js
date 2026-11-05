import { auth } from '$lib/stores/auth';
import { redirect } from '@sveltejs/kit';
import { getLoginUrl } from '$lib/api/login';

export const ssr = false; // disable ssr as we need to access browser cookies

export async function load({ url }) {
    const isAuthenticated = await auth.checkAuth();

    if (!isAuthenticated) {
        throw redirect(302, getLoginUrl());
    }

    return {};
}
