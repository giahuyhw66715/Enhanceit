import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Box, Stack } from "@mui/material";

const MainLayout = () => {
    return (
        <Stack
            direction="column"
            sx={{
                minHeight: "100vh",
            }}
        >
            <Header />
            <Box sx={{ flexGrow: 1, pt: 17 }}>
                <Outlet />
            </Box>
            <Footer />
        </Stack>
    );
};

export default MainLayout;
