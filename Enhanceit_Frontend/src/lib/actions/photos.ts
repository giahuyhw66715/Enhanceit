import axiosInstance from "../config/axiosConfig";
import {
    CustomAxiosRequestConfig,
    InferPhoto,
    PartialBy,
    Photo,
    SuccessResponse,
} from "../types";
import { uploadImage } from "./upload";

type PaginationPhotoResponse = {
    data: Photo[];
    page: number;
    limit: number;
    total_pages: number;
    total_items: number;
};

// type EditPhoto = Photo & { image?: File | string };

export const getAllPhotos = async ({
    page = 1,
    limit = 10,
    tags = [],
    title = "",
}: {
    page?: number;
    limit?: number;
    tags?: string[];
    title?: string;
}): Promise<PaginationPhotoResponse> => {
    const response = await axiosInstance.get("/photos", {
        params: { page, limit, tags, title },
        skipAuth: true,
        paramsSerializer: (params) =>
            Object.keys(params)
                .map((key) =>
                    Array.isArray(params[key])
                        ? params[key]
                              .map((value) => `${key}=${value}`)
                              .join("&")
                        : `${key}=${params[key]}`
                )
                .join("&"),
    } as CustomAxiosRequestConfig);
    return response.data;
};

export const getPhotoById = async (id: string): Promise<Photo> => {
    const response = await axiosInstance.get(`/photos/${id}`);
    return response.data;
};

export const getRelatedPhotos = async (id: string): Promise<Photo[]> => {
    const response = await axiosInstance.get(`/photos/${id}/related`);
    return response.data;
};

export const addPhoto = async (photo: InferPhoto): Promise<SuccessResponse> => {
    const image = await uploadImage(photo.url as File);
    const newPhoto: PartialBy<Photo, "id"> = {
        url: image.secure_url,
        file_size: image.file_size,
        resolution: `${image.width}x${image.height}`,
        author: photo.author || "Anonymous",
        title: photo.title || "Untitled",
        tags: photo.tags || [],
    };
    const response = await axiosInstance.post("/photos", newPhoto);
    return response.data;
};

export const deletePhoto = async (id: string): Promise<SuccessResponse> => {
    const response = await axiosInstance.delete(`/photos/${id}`);
    return response.data;
};

export const editPhoto = async (id: string, photo: InferPhoto) => {
    if (photo.url instanceof File) {
        const image = await uploadImage(photo.url as File);
        photo.url = image.secure_url;
        photo.file_size = image.file_size;
        photo.resolution = `${image.width}x${image.height}`;
    }
    const response = await axiosInstance.put(`/photos/${id}`, photo);
    return response.data;
};
