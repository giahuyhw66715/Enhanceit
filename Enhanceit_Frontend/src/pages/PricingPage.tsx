import { Box, Container, Stack } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PlanCard from "../components/card/PlanCard";
import {
    plans,
    subscriptionBenefits,
    subscriptionFAQs,
} from "../lib/constants";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import IntroCard from "../components/card/IntroCard";
import { v4 } from "uuid";
import FAQAccordion from "../components/common/FAQAccordion";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Publishable Key từ Stripe

const PricingPage = () => {
    return (
        <Container>
            <Elements stripe={stripePromise}>
                <Heading title="Find the right plan for you" />
                <Spacer y={4} />
                <Stack direction={{ xs: "column", sm: "row" }} gap={4}>
                    {plans.map((plan) => (
                        <PlanCard key={plan.name} plan={plan} />
                    ))}
                </Stack>
            </Elements>
            <Spacer y={10} />
            <Box>
                <Heading title="Why you should subscribe" sx={{ mb: 5 }} />
                {subscriptionBenefits.map((benefit, index) => (
                    <IntroCard
                        key={v4()}
                        title={benefit.title}
                        description={benefit.description}
                        image={benefit.image}
                        isLeftImage={index % 2 === 0}
                    />
                ))}
            </Box>
            <Box sx={{ mt: 10 }}>
                <Heading title="Frequently asked questions" sx={{ mb: 5 }} />
                <FAQAccordion faqs={subscriptionFAQs} />
            </Box>
        </Container>
    );
};

export default PricingPage;
