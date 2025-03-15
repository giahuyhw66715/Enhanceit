import axiosInstance from "../config/axiosConfig";
import { InferTool, SuccessResponse, Tool } from "../types";
import { uploadImage } from "./upload";

export const getAllTools = async (): Promise<Tool[]> => {
    const response = await axiosInstance.get("/tools");
    return response.data;
};

export const getToolBySlug = async (slug: string): Promise<Tool> => {
    const response = await axiosInstance.get(`/tools/${slug}`);
    return response.data;
};

export const addTool = async (tool: InferTool): Promise<SuccessResponse> => {
    const image = await uploadImage(tool.image as File);
    const input = await uploadImage(tool.input as File);
    const output = await uploadImage(tool.output as File);
    const response = await axiosInstance.post("/tools", {
        ...tool,
        image: image.secure_url,
        input: input.secure_url,
        output: output.secure_url,
    });
    return response.data;
};

export const processImage = async (file: File, slug: string) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post(
        `/tools/process-image/`,
        formData,
        {
            params: { slug },
            responseType: "blob",
        }
    );
    return response.data;
};

export const deleteTool = async (slug: string): Promise<SuccessResponse> => {
    const response = await axiosInstance.delete(`/tools/${slug}`);
    return response.data;
};

export const editTool = async (slug: string, tool: InferTool) => {
    if (tool.image instanceof File) {
        const image = await uploadImage(tool.image as File);
        tool.image = image.secure_url;
    }
    if (tool.input instanceof File) {
        const input = await uploadImage(tool.input as File);
        tool.input = input.secure_url;
    }
    if (tool.output instanceof File) {
        const output = await uploadImage(tool.output as File);
        tool.output = output.secure_url;
    }
    const response = await axiosInstance.put(`/tools/${slug}`, tool);
    return response.data;
};
