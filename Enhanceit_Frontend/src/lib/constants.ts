import {
    CameraAltOutlined,
    CodeOutlined,
    CorporateFareOutlined,
    PersonOutlineOutlined,
    ShoppingCartOutlined,
    SurroundSoundOutlined,
} from "@mui/icons-material";
import { BasicInfo, Job, Plan, SubscriptionPlan, Tutorial } from "./types";

export const jobs: Job[] = [
    {
        title: "Individuals",
        icon: PersonOutlineOutlined,
        description:
            "Be creative with your presentations, fill up your feed with awesome posts, and easily create amazing designs for your next project. Design graphics like a pro using Removal.AI!",
        image: "https://images.unsplash.com/photo-1737412358025-160a0c22e6c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Photographers",
        icon: CameraAltOutlined,
        description:
            "Streamline your photo editing process and transform your photos into powerful stories that captivate and resonate. Trust Removal.AI to maintain the integrity of your art while adding that perfect finishing touch.",
        image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Marketers",
        icon: SurroundSoundOutlined,
        description:
            "Improve your storytelling by placing your products in any context. We will help ensure that your graphics are not just see but are also memorable and effective in increasing engagement and driving sales.",
        image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Developers",
        icon: CodeOutlined,
        description:
            "Keep your development projects at the forefront of technology by embedding advanced image background capabilities. Removal.AI can be seamlessly integrated to your applications to enrich user experiences.",
        image: "https://images.unsplash.com/photo-1603575448360-153f093fd0b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Ecommerce",
        icon: ShoppingCartOutlined,
        description:
            "Remove backgrounds from product photos to create clean images that highlight your products. Our background remover is designed to handle large volumes of photos, showcasing your items in the cleanest, most professional way.",
        image: "https://images.unsplash.com/photo-1541535881962-3bb380b08458?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Enterprise",
        icon: CorporateFareOutlined,
        description:
            "Join leading companies who trust Removal.AI to enhance their visual content and drive business success. Our background remover is designed to meet the diverse needs of your organization.",
        image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export const intros: BasicInfo[] = [
    {
        title: "Transform Photos with EnhanceIt",
        description:
            "EnhanceIt is your ultimate AI-powered photo editing platform. From background removal toimage colorization, we bring advanced tools that simplify your creative process andelevate your images effortlessly.",
        image: "https://images.unsplash.com/photo-1739216906055-ff4bc897c339?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Why Choose EnhanceIt?",
        description:
            "Discover the easiest way to edit and elevate your images. EnhanceIt combines AI-powered tools with a user-friendly interface, offering a seamless experience for everyone—whether you're a professional designer or just getting started.",
        image: "https://images.unsplash.com/photo-1739361133037-77be66a4ea6a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Loved by Thousands of Creators",
        description:
            "EnhanceIt has helped thousands of creators, photographers, and designers bring their visions to life. See what they’re saying about our tools!",
        image: "https://images.unsplash.com/photo-1739289354200-f5db511bd08b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Our Vision",
        description:
            "At EnhanceIt, our mission is to make professional photo editing accessible to everyone. We believe in empowering creativity through cutting-edge AI technology.",
        image: "https://images.unsplash.com/photo-1739302776943-2d375697e3e1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export const tutorials: Tutorial[] = [
    {
        step: 1,
        title: "Upload your photo",
        description:
            "First, choose the image you want to edit by uploading it from your device. EnhanceIt supports multiple formats like PNG and JPG, ensuring compatibility with most image types.",
    },
    {
        step: 2,
        title: "Choose your tool",
        description:
            "Select one of our powerful AI tools, such as background removal, image upscale, or colorization. Let the technology do the hard work and transform your photo instantly.",
    },
    {
        step: 3,
        title: "Download your result",
        description:
            "Once your photo has been enhanced, download it in high quality. Save your masterpiece and share it with the world or use it for your creative projects.",
    },
];

export const plans: Plan[] = [
    {
        name: SubscriptionPlan.FREE,
        price: "$0.00",
        credits: "5 free credits",
        description: "A great way to try our service with limited access.",
        color: "black",
    },
    {
        name: SubscriptionPlan.PRO,
        price: "$9.99",
        credits: "100 credits/month",
        description:
            "Ideal for casual users who need basic AI-enhanced image editing.",
        color: "primary",
    },
    {
        name: SubscriptionPlan.PREMIUM,
        price: "$19.99",
        credits: "Unlimited credits",
        description:
            "Perfect for professionals who require unlimited access to all features.",
        color: "secondary",
    },
];

export const subscriptionBenefits = [
    {
        title: "Unlimited AI-Powered Editing",
        description:
            "Gain access to powerful AI features such as background removal, image upscaling, and file conversion without any limitations.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "More Credits for Advanced Features",
        description:
            "Upgrade to Pro or Premium to receive more monthly credits, allowing you to enhance more images effortlessly.",
        image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Exclusive Features",
        description:
            "Unlock premium tools and AI-powered enhancements that are only available to Pro and Premium users.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Early Access to New Features",
        description:
            "Be the first to try out new AI enhancements and tools before they are released to free users.",
        image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export const subscriptionFAQs = [
    {
        question:
            "What is the difference between Free, Pro, and Premium plans?",
        answer: "The Free plan offers limited credits and features. The Pro plan provides 100 credits per month, while the Premium plan grants unlimited access to all AI-powered tools.",
    },
    {
        question: "What happens if I run out of credits on the Pro plan?",
        answer: "If you run out of credits on the Pro plan, you can either wait for the next monthly renewal or purchase additional credits.",
    },
    {
        question: "Does the Premium plan include all features?",
        answer: "Yes! The Premium plan includes unlimited access to all current and future features, with no restrictions on usage.",
    },
    {
        question: "Is there a refund policy?",
        answer: "We offer a 7-day refund policy if you are not satisfied with our service. Contact our support team for assistance.",
    },
    {
        question: "Can I switch between plans?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect in the next billing cycle.",
    },
    {
        question: "Do my unused credits roll over to the next month?",
        answer: "No, unused credits do not roll over. Each month, your credits reset based on your subscription plan.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards, PayPal, and other secure online payment methods via Stripe.",
    },
];

export const reviews = [
    {
        content:
            "EnhanceIt has helped me edit photos quickly with excellent quality. The background remover tool works incredibly accurately, and I'm very satisfied!",
        author: {
            name: "Jessica Carter",
            role: "Graphic Designer",
            company: "Creative Studio",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    },
    {
        content:
            "I've tried many image upscaling tools, but EnhanceIt truly stands out. The processed images are sharper without losing details or becoming blurry.",
        author: {
            name: "Michael Johnson",
            role: "Photographer",
            company: "Freelance",
            avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    },
    {
        content:
            "The cartoonization feature is truly impressive! I tested it with several photos, and the results look very natural without any distortion.",
        author: {
            name: "Emily Davis",
            role: "Digital Artist",
            company: "ArtVision",
            avatar: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    },
];
