/**
 * Lazy login URL, with `?redirect=` so that Lazy sends the user back here
 * once logged in (and the shared paresseux-auth-token cookie is set).
 */
export function getLoginUrl() {
    const url = new URL(import.meta.env.VITE_LOGIN_URL);
    if (typeof window !== 'undefined') {
        url.searchParams.set('redirect', window.location.href);
    }
    return url.toString();
}
