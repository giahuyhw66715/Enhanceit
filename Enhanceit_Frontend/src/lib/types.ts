import { SvgIconComponent } from "@mui/icons-material";
import { z } from "zod";
import {
    editUserSchema,
    faqsSchema,
    loginSchema,
    photoSchema,
    registerSchema,
    tagSchema,
    toolSchema,
    userSchema,
} from "./schema";
import { InternalAxiosRequestConfig } from "axios";
import { ButtonProps } from "@mui/material";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type BasicInfo = {
    title: string;
    description: string;
    image: string;
};

export type Job = BasicInfo & {
    icon: SvgIconComponent;
};

export type FAQs = {
    question: string;
    answer: string;
};

export type Tool = BasicInfo & {
    id: string;
    input: string;
    output: string;
    slug: string;
    faqs?: FAQs[];
};

export type Tutorial = {
    step: number;
    title: string;
    description: string;
};

export type Tag = {
    id: string;
    name: string;
    slug: string;
};

export type Photo = {
    id: string;
    title: string;
    tags: Tag[];
    author: string;
    url: string;
    resolution: string;
    file_size: number;
    created_at?: string;
    updated_at?: string;
};

export enum SubscriptionPlan {
    FREE = "free",
    PRO = "pro",
    PREMIUM = "premium",
}

export enum Role {
    USER = "user",
    ADMIN = "admin",
}

export type User = {
    id: string;
    email: string;
    fullname: string;
    credits: number;
    role: Role;
    subscription_plan: SubscriptionPlan;
    subscription_expires: string;
};

export type SuccessResponse = { message: string };
export type ErrorResponse = { response: { data: { detail: string } } };
export type UploadImageResponse = {
    width: number;
    height: number;
    format: string;
    secure_url: string;
    file_size: number;
};

export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type Plan = {
    name: SubscriptionPlan;
    price: string;
    credits: string;
    description: string;
    color: ButtonProps["color"];
};

export type Review = {
    content: string;
    author: {
        name: string;
        role: string;
        company: string;
        avatar: string;
    };
};

export type InferTool = z.infer<typeof toolSchema>;
export type InferTag = z.infer<typeof tagSchema>;
export type InferPhoto = z.infer<typeof photoSchema>;
export type InferLogin = z.infer<typeof loginSchema>;
export type InferRegister = z.infer<typeof registerSchema>;
export type InferFaq = z.infer<typeof faqsSchema>;
export type InferUser = z.infer<typeof userSchema>;
export type InferEditUser = z.infer<typeof editUserSchema>;

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    skipAuth?: boolean;
}
