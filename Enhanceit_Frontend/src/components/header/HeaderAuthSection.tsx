import { Logout, Person } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import {
    Avatar,
    Button,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
} from "@mui/material";
import { useState } from "react";
import useMedia from "../../hooks/useMedia";
import { useNavigate } from "react-router-dom";

const HeaderAuthSection = ({ isLargeScreen }: { isLargeScreen: boolean }) => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();
    const { isDesktop } = useMedia();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {user ? (
                <>
                    <Avatar
                        alt={user.email}
                        src=""
                        sx={{
                            width: 30,
                            height: 30,
                            cursor: "pointer",
                            display: isDesktop ? "flex" : "none",
                        }}
                        onClick={handleClick}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    borderRadius: "12px",
                                    width: "100%",
                                    maxWidth: 200,
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <MenuItem onClick={() => navigate("/profile")}>
                            <ListItemIcon>
                                <Person fontSize="small" />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        display: isLargeScreen
                            ? { xs: "none", md: "flex" }
                            : { xs: "flex", md: "none" },
                    }}
                >
                    <Button variant="contained" color="gray" href="/auth/login">
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
            )}
        </>
    );
};

export default HeaderAuthSection;
