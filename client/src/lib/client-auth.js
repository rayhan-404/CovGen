const TOKEN_KEY = 'covgen_token';
export function getStoredToken() {
    if (typeof window === 'undefined')
        return null;
    try {
        return window.localStorage.getItem(TOKEN_KEY);
    }
    catch {
        return null;
    }
}
export function storeToken(token) {
    if (typeof window === 'undefined')
        return;
    try {
        window.localStorage.setItem(TOKEN_KEY, token);
    }
    catch {
        /* storage unavailable */
    }
}
export function clearStoredToken() {
    if (typeof window === 'undefined')
        return;
    try {
        window.localStorage.removeItem(TOKEN_KEY);
    }
    catch {
        /* storage unavailable */
    }
}
/** Extra request headers carrying the bearer token, when one is stored. */
export function authHeaders() {
    const token = getStoredToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}
