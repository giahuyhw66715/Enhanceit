import axiosInstance from "../config/axiosConfig";

export const createCheckoutSession = async (
    plan: string,
    user_email: string
) => {
    const response = await axiosInstance.post(
        "/payment/create-checkout-session",
        {
            plan,
            user_email,
        }
    );
    return response.data;
};
