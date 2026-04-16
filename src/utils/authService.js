import {jwtDecode} from "jwt-decode";
import api from "./api";

const API_BASE_URL = "http://localhost:8080/api";

let isLoggingOut = false;

/* =======================
   Helpers (private)
======================= */
function setTokens({
                       accessToken,
                       refreshToken,
                       tokenType,
                       expiresIn,
                       expiresInRefreshToken,
                   }) {
    // accessToken + expireho
    const accessTokenExpiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("tokenType", tokenType || "Bearer");
    localStorage.setItem("accessTokenExpiresAt", accessTokenExpiresAt.toString());

    // refreshToken + expire
    if (refreshToken && expiresInRefreshToken) {
        const refreshTokenExpiresAt = Date.now() + expiresInRefreshToken * 1000;
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("refreshTokenExpiresAt", refreshTokenExpiresAt.toString());
    }
}

function clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("accessTokenExpiresAt");
    localStorage.removeItem("refreshTokenExpiresAt");
}

function isTokenValid(expiryKey) {
    const exp = localStorage.getItem(expiryKey);
    return exp && Date.now() < parseInt(exp, 10);
}

/* =======================
   Public API
======================= */
export const authService = {
    login: async (usernameOrEmail, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({usernameOrEmail, password}),
            });

            const data = await response.json();
            if (data.status !== 200) {
                return {success: false, message: data.message || "Login failed"};
            }

            const {
                accessToken,
                refreshToken,
                tokenType,
                expiresIn,
                expiresInRefreshToken,
                roles,
            } = data.data;

            setTokens({
                accessToken,
                refreshToken,
                tokenType,
                expiresIn,
                expiresInRefreshToken,
            });

            const user = {username: usernameOrEmail, role: roles ?? []};
            localStorage.setItem("user", JSON.stringify(user));
            return {success: true, user, tokens: data.data};
        } catch (error) {
            console.error("Login error:", error);
            return {success: false, message: "Có lỗi xảy ra khi login"};
        }
    },

    logout: async () => {
        isLoggingOut = true;
        try {
            const token = localStorage.getItem("refreshToken");
            const type = localStorage.getItem("tokenType") || "Bearer";

            // 1. Gọi API
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${type} ${token}`,
                },
            });

            let data = {};
            try {
                data = await response.json();
            } catch (e) {
                console.log("Logout response has no JSON body");
            }

            clearTokens();
            localStorage.removeItem("user");
            localStorage.removeItem("cartCount");

            // Dispatch event để update UI (ví dụ reset giỏ hàng trên header)
            window.dispatchEvent(new Event("cart:refresh"));

            // Reset flag
            // Lưu ý: nên set timeout nhỏ hoặc giữ nguyên true nếu trang sẽ reload ngay sau đó
            setTimeout(() => { isLoggingOut = false; }, 1000);

            // 4. Trả về kết quả đã chuẩn hóa
            if (response.ok) {
                // Status 200-299
                return {
                    success: true,
                    message: data.message || "Đăng xuất thành công"
                };
            } else {
                // Status lỗi (4xx, 5xx) từ BE trả về
                return {
                    success: false,
                    message: data.message || "Đăng xuất thất bại phía server"
                };
            }

        } catch (error) {
            // 5. Lỗi mạng hoặc lỗi code (Network Error)
            console.error("Logout error:", error);

            // Vẫn phải xóa token để người dùng không bị kẹt
            clearTokens();
            localStorage.removeItem("user");
            window.dispatchEvent(new Event("cart:refresh"));
            isLoggingOut = false;

            return {
                success: false,
                message: "Có lỗi xảy ra khi kết nối đến server"
            };
        }
    },

    getCurrentUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        const accessValid = isTokenValid("accessTokenExpiresAt");
        const refreshValid = isTokenValid("refreshTokenExpiresAt");
        return accessValid && refreshValid;
    },

    getAuthHeader: () => {
        const token = localStorage.getItem("accessToken");
        const type = localStorage.getItem("tokenType") || "Bearer";
        return token ? {Authorization: `${type} ${token}`} : {};
    },

    loginWithGoogle: async () => {
        const res = await fetch(`${API_BASE_URL}/auth/login-google`, {
            method: "GET",
            credentials: "include",
        });

        return res.json();
    },

    handleGoogleCallback: async (code, state) => {
        try {
            const res = await fetch(
                `${API_BASE_URL}/auth/callback?code=${code}&state=${state}`,
                {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store", // Ngăn cache
                }
            );

            const data = await res.json(); // { status, data }
            console.log("BE response:", data);
            if (data.status !== 200) {
                return {success: false, message: data.message || "Login Google thất bại"};
            }

            // Giống login thường: destructuring dữ liệu trả về
            const {
                accessToken,
                refreshToken,
                tokenType,
                expiresIn,
                expiresInRefreshToken,
                roles,
                username: responseUsername,  // Đổi tên để tránh conflict
                email,
            } = data.data;

            // Decode JWT token để lấy username từ payload nếu BE không cung cấp
            let finalUsername = responseUsername || email || "GoogleUser";
            if (accessToken) {
                try {
                    const decodedToken = jwtDecode(accessToken);  // Giả sử dùng jwt-decode library
                    finalUsername = decodedToken.sub;
                    console.log("Username từ token:", finalUsername);  // Debug log
                } catch (decodeError) {
                    console.warn("Lỗi decode token:", decodeError);
                    // Fallback về responseUsername hoặc email
                }
            }

            // Lưu token vào localStorage/sessionStorage
            setTokens({
                accessToken,
                refreshToken,
                tokenType,
                expiresIn,
                expiresInRefreshToken,
            });

            // Lưu thông tin user (sử dụng finalUsername)
            const user = {
                username: finalUsername,
                role: roles ?? [],
            };
            localStorage.setItem("user", JSON.stringify(user));

            return {success: true, user, tokens: data.data};
        } catch (error) {
            console.error("Fetch error:", error);
            return {success: false, message: "Có lỗi xảy ra khi xử lý callback Google"};
        }
    },

    refreshAccessToken: async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        const type = localStorage.getItem("tokenType") || "Bearer";

        if (!refreshToken) {
            console.warn("⚠️ Không có refreshToken → logout");
            await authService.logout();
            return null;
        }

        console.log("🔄 Gọi API refresh access token...");
        try {
            const response = await fetch(`${API_BASE_URL}/auth/get-new-access-token`, {
                method: "POST",
                headers: { Authorization: `${type} ${refreshToken}` },
            });

            const data = await response.json();

            // 🔥 KIỂM TRA: Nếu API Refresh trả về lỗi (400, 401, 403) -> Logout ngay
            const isRefeshFailed =
                response.status === 400 || response.status === 401 || response.status === 403 ||
                data.status === 400 || data.status === 401 || data.status === 403;

            if (isRefeshFailed) {
                console.warn("❌ Refresh Token hết hạn hoặc không hợp lệ -> Logout");
                if (!isLoggingOut) {
                    isLoggingOut = true;
                    await authService.logout();
                    // Để api.js xử lý redirect hoặc redirect tại đây
                }
                return null;
            }

            // ✅ Thành công
            if (data.status === 200 && data.data?.accessToken) {
                const {
                    accessToken,
                    refreshToken: newRefreshToken,
                    tokenType,
                    expiresIn,
                    expiresInRefreshToken,
                } = data.data;

                setTokens({
                    accessToken,
                    refreshToken: newRefreshToken || refreshToken,
                    tokenType: tokenType || "Bearer",
                    expiresIn,
                    expiresInRefreshToken: expiresInRefreshToken || null,
                });

                console.log("✅ Access token mới:", accessToken);
                return accessToken;
            }

            return null;
        } catch (error) {
            console.error("Refresh token error:", error);
            if (!isLoggingOut) {
                isLoggingOut = true;
                await authService.logout();
                isLoggingOut = false;
            }
            return null;
        }
    },

    setTokens: (tokens) => setTokens(tokens),

    getUserRoles: () => {
        const user = authService.getCurrentUser();
        return user?.role || [];
    },

    getUsername: () => {
        const user = authService.getCurrentUser();
        return user?.username || null;
    },

    hasRole: (requiredRoles) => {
        const roles = authService.getUserRoles();
        if (!roles || roles.length === 0) return false;

        if (typeof requiredRoles === "string") {
            return roles.includes(requiredRoles);
        }
        return requiredRoles.some((role) => roles.includes(role));
    },
    register: async (username, email, password) => {
        try {
            const payload = {
                username,
                email,
                password,
            }
            return await api.post(`${API_BASE_URL}/auth/register`, payload)
        } catch (error) {
            console.error("Register error:", error);
            return {success: false, message: "Có lỗi xảy ra khi đăng ký"};
        }
    },
    forgotPassword: async (email) => {
        console.log("checkk email" + email);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });

            let data = null;
            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (response.ok) {
                return {
                    success: true,
                    message: data.message || "Yêu cầu khôi phục mật khẩu đã được gửi!",
                };
            } else {
                return {
                    success: false,
                    message: data?.message || "Không thể gửi yêu cầu khôi phục mật khẩu",
                };
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            return {
                success: false,
                message: "Có lỗi xảy ra khi gửi yêu cầu quên mật khẩu",
            };
        }
    },
    activeAccount: async (token) => {
        const response = await fetch(`${API_BASE_URL}/auth/active`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token}),
        });
        return response.json();
    },
    changePassword: async (oldPassword, newPassword) => {
        try {
            const response = await api.put(`/auth/change-password`, {
                oldPassword,
                newPassword
            });
            return response;
        } catch (error) {
            return {
                success: false,
                message: error.message || "Đổi mật khẩu thất bại"
            };
        }
    },
    isLoggingOut: () => isLoggingOut,
};
