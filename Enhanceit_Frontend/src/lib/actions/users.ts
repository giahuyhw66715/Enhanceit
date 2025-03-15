import axiosInstance from "../config/axiosConfig";
import { InferEditUser, InferUser } from "../types";

export const getAllUsers = async () => {
    const response = await axiosInstance.get("/users");
    return response.data;
};

export const getUserById = async (id: string) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
};

export const editUser = async (id: string, user: InferEditUser) => {
    console.log("🚀 ~ user:", user);
    const response = await axiosInstance.put(`/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: string) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
};

export const addUser = async (user: InferUser) => {
    if (user.subscription_expires) {
        user.subscription_expires = new Date(
            user.subscription_expires
        ).toISOString();
    } else {
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1); // Thêm 1 tháng
        user.subscription_expires = oneMonthLater.toISOString();
    }
    const response = await axiosInstance.post("/users", user);
    return response.data;
};
