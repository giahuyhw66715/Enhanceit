import axiosInstance from "../config/axiosConfig";
import { InferTag, SuccessResponse, Tag } from "../types";

export const getAllTags = async (): Promise<Tag[]> => {
    const response = await axiosInstance.get("/tags");
    return response.data;
};

export const getTagBySlug = async (slug: string): Promise<Tag> => {
    const response = await axiosInstance.get(`/tags/${slug}`);
    return response.data;
};

export const addTag = async (tag: InferTag): Promise<SuccessResponse> => {
    const response = await axiosInstance.post("/tags", tag);
    return response.data;
};

export const editTag = async (
    slug: string,
    tag: InferTag
): Promise<SuccessResponse> => {
    const response = await axiosInstance.put(`/tags/${slug}`, tag);
    return response.data;
};

export const deleteTag = async (slug: string): Promise<SuccessResponse> => {
    const response = await axiosInstance.delete(`/tags/${slug}`);
    return response.data;
};
