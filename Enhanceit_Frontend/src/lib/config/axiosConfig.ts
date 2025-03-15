import axios from "axios";
import { logout, refreshToken } from "../actions/auth";
import { CustomAxiosRequestConfig } from "../types";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// 🔹 Interceptor: Thêm access token vào mỗi request (nếu không có `skipAuth: true`)
axiosInstance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
        if (!config.skipAuth) {
            // Nếu không có `skipAuth`, thêm token
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 Interceptor: Tự động refresh token nếu bị 401 (Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        try {
            const config = error.config as CustomAxiosRequestConfig;
            if (
                error.response &&
                error.response.status === 401 &&
                !error.config.skipAuth
            ) {
                const newAccessToken = await refreshToken();
                if (newAccessToken) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return axios(config); // Gửi lại request với token mới
                }
            }
        } catch (error) {
            logout();
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
