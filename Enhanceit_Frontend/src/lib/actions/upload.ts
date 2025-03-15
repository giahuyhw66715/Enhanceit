import axiosInstance from "../config/axiosConfig";
import { UploadImageResponse } from "../types";

export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post("/upload", formData);
    return response.data;
};
