import { Container, Stack, Typography } from "@mui/material";
import Image from "../components/common/Image";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Stack alignItems="center" spacing={1} sx={{ textAlign: "center" }}>
                <Image
                    src="/images/401-Unauthorized.svg"
                    alt="401 Unauthorized"
                    sx={{ maxWidth: "400px" }}
                />
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, mt: 4 }}
                    align="center"
                >
                    Go back to the <Link to="/">home page</Link>
                </Typography>
            </Stack>
        </Container>
    );
};

export default UnauthorizedPage;
