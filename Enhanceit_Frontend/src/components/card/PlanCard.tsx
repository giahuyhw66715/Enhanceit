import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from "@mui/material";
import { v4 } from "uuid";
import { ErrorResponse, Plan, SubscriptionPlan } from "../../lib/types";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { createCheckoutSession } from "../../lib/actions/payment";
import { useNavigate } from "react-router-dom";

const PlanCard = ({ plan }: { plan: Plan }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const subscribeMutation = useMutation({
        mutationFn: async (plan: string) => {
            return await createCheckoutSession(plan, user!.email);
        },
        onSuccess: (data) => {
            window.location.href = data.checkout_url;
        },
        onError: (error: ErrorResponse) => {
            toast.error(error.response.data.detail);
        },
    });

    const isSubscribed = user?.subscription_plan === plan.name;
    const isFreeIncluded =
        user &&
        user?.subscription_plan !== SubscriptionPlan.FREE &&
        plan.name === SubscriptionPlan.FREE;

    return (
        <Card key={v4()} sx={{ width: "100%", boxShadow: 3, borderRadius: 3 }}>
            <CardHeader
                title={plan.name}
                sx={{
                    "& .MuiCardHeader-title": {
                        textAlign: "center",
                        fontSize: 24,
                        fontWeight: 600,
                        textTransform: "capitalize",
                    },
                    pb: 0,
                }}
            />
            <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                    {plan.price}
                    <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                    >
                        /month
                    </Typography>
                </Typography>
                <Typography color="textSecondary">{plan.credits}</Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                    {plan.description}
                </Typography>
                {isSubscribed || isFreeIncluded ? (
                    <Button
                        variant="contained"
                        disabled
                        fullWidth
                        sx={{
                            mt: 2,
                            borderRadius: 2,
                            textTransform: "capitalize",
                        }}
                    >
                        {plan.name === SubscriptionPlan.FREE
                            ? "Included"
                            : "Subscribed"}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color={plan.color}
                        fullWidth
                        onClick={() =>
                            user
                                ? subscribeMutation.mutate(plan.name)
                                : plan.name === SubscriptionPlan.FREE
                                ? navigate("/auth/login")
                                : toast.error("Please login to subscribe")
                        }
                        sx={{
                            mt: 2,
                            borderRadius: 2,
                            textTransform: "capitalize",
                        }}
                    >
                        Choose {plan.name}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default PlanCard;
