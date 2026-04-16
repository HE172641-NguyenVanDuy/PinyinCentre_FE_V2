import axios from "axios";
import { toast } from "react-toastify";
import { authService } from "./authService";

const API_BASE_URL = "/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 100000000000,
});

let refreshingPromise = null;

const handleLogout = async () => {
    if (authService.isLoggingOut()) {
        return;
    }
    toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    await authService.logout();
    if (!window.location.pathname.startsWith("/login")) {
        setTimeout(() => {
            window.location.replace("/login");
        }, 3000);
    }
};
api.interceptors.request.use(
    (config) => {
        const headers = authService.getAuthHeader();
        config.headers = { ...config.headers, ...headers };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🟥 Response Interceptor
api.interceptors.response.use(
    async (response) => {
        const data = response.data;
        const originalRequest = response.config;

        // -----------------------------------------------------------
        // CASE 1: BE trả về HTTP 200 nhưng Body báo lỗi (Soft Error)
        // -----------------------------------------------------------
        if (data?.status === 401 || data?.status === 403) {
            console.warn("⚠️ SOFT 401 DETECTED:", data);

            // Nếu chưa retry lần nào -> Thử Refresh
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    if (!refreshingPromise) {
                        refreshingPromise = authService.refreshAccessToken();
                    }
                    const newAccessToken = await refreshingPromise;
                    refreshingPromise = null;

                    if (newAccessToken) {
                        originalRequest.headers[
                            "Authorization"
                            ] = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    }
                } catch (e) {
                    refreshingPromise = null;
                }
            }

            // Nếu refresh thất bại hoặc đã retry rồi mà vẫn lỗi -> Logout
            await handleLogout();
            return Promise.reject(new Error(data.message || "Session expired"));
        }

        // Các lỗi logic khác (400)
        if (data?.status === 400) {
            const message = data?.message || "Yêu cầu không hợp lệ";
            toast.error(message);
            return Promise.reject(new Error(message));
        }

        // ✅ Thành công thật sự
        return data;
    },
    async (error) => {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }
        // -----------------------------------------------------------
        // CASE 2: BE trả về HTTP Error (Hard Error: 401, 403...)
        // -----------------------------------------------------------
        const originalRequest = error.config;
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        console.log("⛔ HARD ERROR INTERCEPTOR:", { status, message });

        const shouldTryRefresh =
            (status === 401 || status === 403) &&
            originalRequest &&
            !originalRequest._retry;

        if (shouldTryRefresh) {
            originalRequest._retry = true;

            try {
                if (!refreshingPromise) {
                    refreshingPromise = authService.refreshAccessToken();
                }

                const newAccessToken = await refreshingPromise;
                refreshingPromise = null;

                if (newAccessToken) {
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } else {
                    // Refresh trả về null (do authService đã bắt lỗi 401 của refresh token)
                    await handleLogout();
                    return Promise.reject(error);
                }
            } catch (e) {
                console.error("Lỗi refresh token process:", e);
                refreshingPromise = null;
                await handleLogout();
                return Promise.reject(error);
            }
        }

        // Các lỗi khác không phải 401
        if (status !== 401) {
            toast.error(message || "Có lỗi xảy ra");
        }

        return Promise.reject(error);
    }
);

export default api;
import axios from "axios";
import { toast } from "react-toastify";
import { authService } from "./authService";

const API_BASE_URL = "/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 100000000000,
});

let refreshingPromise = null;

const handleLogout = async () => {
    if (authService.isLoggingOut()) {
        return;
    }
    toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
    await authService.logout();
    if (!window.location.pathname.startsWith("/login")) {
        setTimeout(() => {
            window.location.replace("/login");
        }, 3000);
    }
};
api.interceptors.request.use(
    (config) => {
        const headers = authService.getAuthHeader();
        config.headers = { ...config.headers, ...headers };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🟥 Response Interceptor
api.interceptors.response.use(
    async (response) => {
        const data = response.data;
        const originalRequest = response.config;

        // -----------------------------------------------------------
        // CASE 1: BE trả về HTTP 200 nhưng Body báo lỗi (Soft Error)
        // -----------------------------------------------------------
        if (data?.status === 401 || data?.status === 403) {
            console.warn("⚠️ SOFT 401 DETECTED:", data);

            // Nếu chưa retry lần nào -> Thử Refresh
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    if (!refreshingPromise) {
                        refreshingPromise = authService.refreshAccessToken();
                    }
                    const newAccessToken = await refreshingPromise;
                    refreshingPromise = null;

                    if (newAccessToken) {
                        originalRequest.headers[
                            "Authorization"
                            ] = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    }
                } catch (e) {
                    refreshingPromise = null;
                }
            }

            // Nếu refresh thất bại hoặc đã retry rồi mà vẫn lỗi -> Logout
            await handleLogout();
            return Promise.reject(new Error(data.message || "Session expired"));
        }

        // Các lỗi logic khác (400)
        if (data?.status === 400) {
            const message = data?.message || "Yêu cầu không hợp lệ";
            toast.error(message);
            return Promise.reject(new Error(message));
        }

        // ✅ Thành công thật sự
        return data;
    },
    async (error) => {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }
        // -----------------------------------------------------------
        // CASE 2: BE trả về HTTP Error (Hard Error: 401, 403...)
        // -----------------------------------------------------------
        const originalRequest = error.config;
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        console.log("⛔ HARD ERROR INTERCEPTOR:", { status, message });

        const shouldTryRefresh =
            (status === 401 || status === 403) &&
            originalRequest &&
            !originalRequest._retry;

        if (shouldTryRefresh) {
            originalRequest._retry = true;

            try {
                if (!refreshingPromise) {
                    refreshingPromise = authService.refreshAccessToken();
                }

                const newAccessToken = await refreshingPromise;
                refreshingPromise = null;

                if (newAccessToken) {
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } else {
                    // Refresh trả về null (do authService đã bắt lỗi 401 của refresh token)
                    await handleLogout();
                    return Promise.reject(error);
                }
            } catch (e) {
                console.error("Lỗi refresh token process:", e);
                refreshingPromise = null;
                await handleLogout();
                return Promise.reject(error);
            }
        }

        // Các lỗi khác không phải 401
        if (status !== 401) {
            toast.error(message || "Có lỗi xảy ra");
        }

        return Promise.reject(error);
    }
);

export default api;
