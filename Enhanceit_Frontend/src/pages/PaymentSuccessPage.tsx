import { Container, Stack, Typography } from "@mui/material";
import Heading from "../components/common/Heading";
import { CheckCircleOutlined } from "@mui/icons-material";

const PaymentSuccessPage = () => {
    return (
        <Container>
            <Stack
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ textAlign: "center" }}
            >
                <CheckCircleOutlined
                    sx={{ color: "#4CAF50", fontSize: "80px" }}
                />
                <Heading title="Payment Success" sx={{ color: "#4CAF50" }} />
                <Typography variant="body1">
                    Your payment has been successfully processed. Thank you for
                    your purchase!
                </Typography>
            </Stack>
        </Container>
    );
};

export default PaymentSuccessPage;
