import axiosInstance from "../config/axiosConfig";
import {
    CustomAxiosRequestConfig,
    InferLogin,
    InferRegister,
    Token,
} from "../types";

export const register = async (user: InferRegister): Promise<Token> => {
    const response = await axiosInstance.post(`/auth/register`, user, {
        skipAuth: true,
    } as CustomAxiosRequestConfig);

    const { access_token, refresh_token } = response.data;

    // ✅ Lưu tokens vào localStorage
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);

    return response.data;
};

export const login = async (user: InferLogin): Promise<Token> => {
    const response = await axiosInstance.post(`/auth/login`, user, {
        skipAuth: true,
    } as CustomAxiosRequestConfig);

    const { access_token, refresh_token } = response.data;

    // ✅ Lưu tokens vào localStorage
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);

    return response.data;
};

export const refreshToken = async () => {
    const refresh_token = localStorage.getItem("refreshToken");
    if (!refresh_token) return null;

    const response = await axiosInstance.post(`/auth/refresh_token`, {
        refresh_token,
    });

    // ✅ Cập nhật access token mới
    localStorage.setItem("accessToken", response.data.access_token);

    return response.data.access_token;
};

export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const fetchMe = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
};
