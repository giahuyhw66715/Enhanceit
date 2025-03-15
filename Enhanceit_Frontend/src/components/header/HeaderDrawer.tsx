import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { v4 } from "uuid";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Image from "../common/Image";

type HeaderDrawerProps = {
    handleDrawerToggle: () => void;
    navItems: string[];
};

const HeaderDrawer = ({ handleDrawerToggle, navItems }: HeaderDrawerProps) => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();
    const expandNavItems = [
        ...navItems,
        ...(user ? ["Profile", "Logout"] : ["Login", "Start creating"]),
    ];

    const handleSelect = (item: string) => {
        if (item.toLowerCase() === "logout") handleLogout();
        navigate(`/${item.toLowerCase()}`);
    };

    return (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Image
                src="/images/logo.svg"
                alt="Logo"
                sx={{
                    width: 150,
                    display: "block",
                    p: 2,
                    mx: "auto",
                }}
            />
            <Divider />
            <List>
                {expandNavItems.map((item) => (
                    <ListItem
                        key={v4()}
                        disablePadding
                        onClick={() => handleSelect(item)}
                    >
                        <ListItemButton sx={{ textAlign: "center" }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default HeaderDrawer;
