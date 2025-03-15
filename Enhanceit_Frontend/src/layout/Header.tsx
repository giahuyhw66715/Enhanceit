import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Container, Link, Stack, useTheme } from "@mui/material";
import slugify from "../utils/slugify";
import Image from "../components/common/Image";
import useAuth from "../hooks/useAuth";
import { Role } from "../lib/types";
import { v4 } from "uuid";
import HeaderDrawer from "../components/header/HeaderDrawer";
import HeaderAuthSection from "../components/header/HeaderAuthSection";

const drawerWidth = 240;

export default function Header() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { user } = useAuth();
    const theme = useTheme();
    const navItems = [
        "Photos",
        "Tools",
        "Pricing",
        ...(user?.role === Role.ADMIN ? ["Management"] : []),
    ];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav" sx={{ bgcolor: "#fff", paddingY: "4px" }}>
                <Container>
                    <Toolbar>
                        <Link href="/">
                            <Image
                                src="/images/logo.svg"
                                alt="Logo"
                                sx={{
                                    width: 150,
                                    display: "block",
                                }}
                            />
                        </Link>
                        <Stack
                            direction="row"
                            spacing={4}
                            sx={{
                                display: { xs: "none", sm: "block" },
                                marginLeft: "auto",
                                marginRight: { md: "auto" },
                            }}
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={v4()}
                                    href={`/${slugify(item)}`}
                                    underline="none"
                                    color="textPrimary"
                                    sx={{
                                        fontWeight: 600,
                                        ":hover": {
                                            color: theme.palette.primary.main,
                                        },
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                        <HeaderAuthSection isLargeScreen />
                        {/* {user ? (
                            <Avatar
                                alt={user.email}
                                src=""
                                sx={{
                                    width: 30,
                                    height: 30,
                                    cursor: "pointer",
                                }}
                            />
                        ) : (
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ display: { xs: "none", md: "block" } }}
                            >
                                <Button
                                    variant="contained"
                                    color="gray"
                                    href="/auth/login"
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    color="black"
                                    href="/auth/register"
                                >
                                    Start creating
                                </Button>
                            </Stack>
                        )} */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { sm: "none" },
                            }}
                        />
                        <IconButton
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                display: { sm: "none" },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Drawer toggle */}
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    <HeaderDrawer
                        handleDrawerToggle={handleDrawerToggle}
                        navItems={navItems}
                    />
                </Drawer>
            </nav>
        </Box>
    );
}
