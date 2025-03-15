import { Box, Grid2 } from "@mui/material";
import Image from "../components/common/Image";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                py: 10,
            }}
        >
            <Grid2
                container
                spacing={5}
                sx={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "1000px",
                    mx: "auto",
                    backgroundColor: "white",
                    boxShadow: 3,
                    p: 5,
                    borderRadius: "12px",
                    alignItems: "center",
                }}
            >
                <Grid2
                    size={6}
                    sx={{
                        height: "100%",
                    }}
                >
                    <Image
                        src="/images/auth.svg"
                        alt="Image"
                        sx={{
                            height: "100%",
                        }}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <Outlet />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default AuthLayout;
