import { Outlet } from "react-router-dom";
import AdminAppBar from "../components/admin/AdminAppBar";
import AdminDrawer from "../components/admin/AdminDrawer";
import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { Role } from "../lib/types";
import UnauthorizedPage from "../pages/UnauthorizedPage";

const drawerWidth = 320;

export default function AdminLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { user } = useAuth();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    if (!user || user.role !== Role.ADMIN) return <UnauthorizedPage />;

    return (
        <Box sx={{ display: "flex" }}>
            <AdminAppBar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />
            <AdminDrawer
                mobileOpen={mobileOpen}
                drawerWidth={drawerWidth}
                handleDrawerClose={handleDrawerClose}
                handleDrawerTransitionEnd={handleDrawerTransitionEnd}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    pt: 7,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
