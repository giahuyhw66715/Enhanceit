import axiosInstance from "../config/axiosConfig";
import { FAQs, Tool } from "../types";

export const editFAQs = async (slug: string, data: Tool) => {
    const response = await axiosInstance.put(`/tools/${slug}`, data);
    return response.data;
};

export const addFAQ = async (slug: string, faq: FAQs) => {
    const response = await axiosInstance.post(`/tools/${slug}/faqs`, faq);
    return response.data;
};

export const deleteFAQ = async (slug: string, faq: FAQs) => {
    const response = await axiosInstance.delete(`/tools/${slug}/faqs`, {
        data: faq,
    });
    return response.data;
};
