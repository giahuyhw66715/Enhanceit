import { Container, Stack, Typography } from "@mui/material";
import Image from "../components/common/Image";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Container maxWidth="sm">
            <Stack alignItems="center" spacing={1} sx={{ textAlign: "center" }}>
                <Image
                    src="/images/404.svg"
                    alt="404 Not found"
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

export default NotFoundPage;
