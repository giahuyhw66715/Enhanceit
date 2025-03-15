import { z } from "zod";
import { SubscriptionPlan } from "./types";

const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

const imageFilterSchema = z
    .any()
    .refine((file) => !!file, "Image is required")
    .refine(
        (file) =>
            ACCEPTED_IMAGE_TYPES.some((type) =>
                file instanceof File
                    ? file.type.includes(type)
                    : file?.includes(type)
            ),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
    );

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
    );

export const toolSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: imageFilterSchema,
    input: imageFilterSchema,
    output: imageFilterSchema,
});

export const tagSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().optional(),
});

export const photoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    tags: z
        .any()
        .refine((tags) => tags.length > 0, "At least one tag is required"),
    url: imageFilterSchema,
    author: z.string().min(1, "Author is required"),
    file_size: z.number().optional(),
    resolution: z.string().optional(),
});

export const registerSchema = z
    .object({
        email: z.string().min(1, "Email is required"),
        password: passwordSchema,
        confirmPassword: passwordSchema,
        fullname: z.string().min(1, "Full name is required"),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmPassword"],
                message: "Passwords do not match",
            });
        }
    });

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: passwordSchema,
});

export const faqsSchema = z.object({
    tool_slug: z.string().min(1, "Tool is required"),
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
});

export const userSchema = registerSchema._def.schema.extend({
    role: z.enum(["user", "admin"]).default("user"),
    subscription_plan: z
        .enum([
            SubscriptionPlan.FREE,
            SubscriptionPlan.PRO,
            SubscriptionPlan.PREMIUM,
        ])
        .default(SubscriptionPlan.FREE),
    subscription_expires: z.string().optional(),
    credits: z.number().default(5),
});

export const editUserSchema = userSchema.omit({}).extend({
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
});
