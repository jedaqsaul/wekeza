import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  // Fail loudly rather than silently calling the wrong host.
  console.error("VITE_API_URL is not set. Copy .env.example to .env and configure it.");
}

const ACCESS_KEY = "wekeza_access_token";
const REFRESH_KEY = "wekeza_refresh_token";

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  setTokens: ({ access, refresh }) => {
    if (access) localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Concurrent 401s share one refresh call instead of each firing their own.
let isRefreshing = false;
let pendingQueue = [];

function resolveQueue(error, token) {
  pendingQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token)));
  pendingQueue = [];
}

// Lets AuthContext clear app state when a background refresh fails.
const sessionExpiredListeners = new Set();
export function onSessionExpired(listener) {
  sessionExpiredListeners.add(listener);
  return () => sessionExpiredListeners.delete(listener);
}
function notifySessionExpired() {
  sessionExpiredListeners.forEach((listener) => listener());
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || "";
    const isAuthEndpoint =
      url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/auth/refresh");

    if (status !== 401 || !originalRequest || originalRequest._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    const refresh = tokenStorage.getRefresh();
    if (!refresh) {
      tokenStorage.clear();
      notifySessionExpired();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(`${API_URL}/auth/refresh/`, { refresh });
      // The backend rotates refresh tokens, so keep the new one when provided.
      tokenStorage.setTokens({ access: data.access, refresh: data.refresh });
      resolveQueue(null, data.access);
      originalRequest.headers.Authorization = `Bearer ${data.access}`;
      return api(originalRequest);
    } catch (refreshError) {
      resolveQueue(refreshError, null);
      tokenStorage.clear();
      notifySessionExpired();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

/**
 * Normalises any API error into { message, details } using the backend's
 * { error: { message, details } } shape, with sensible fallbacks.
 */
export function parseApiError(error) {
  if (error.response) {
    const payload = error.response.data;
    if (payload?.error?.message) {
      return { message: payload.error.message, details: payload.error.details || null };
    }
    if (payload?.detail) return { message: payload.detail, details: null };
    return { message: `The server rejected that request (error ${error.response.status}).`, details: null };
  }
  if (error.request) {
    return { message: "Can't reach the server. Check your connection and try again.", details: null };
  }
  return { message: error.message || "An unexpected error occurred.", details: null };
}

export default api;
