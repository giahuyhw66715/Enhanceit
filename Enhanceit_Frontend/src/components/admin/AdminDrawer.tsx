import {
    Box,
    Divider,
    Drawer,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SvgIcon,
} from "@mui/material";
import Image from "../common/Image";
import {
    AutoFixHighOutlined,
    DashboardOutlined,
    HelpCenterOutlined,
    PeopleOutlineOutlined,
    PhotoOutlined,
    StyleOutlined,
    SvgIconComponent,
} from "@mui/icons-material";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";

type AdminDrawerProps = {
    mobileOpen: boolean;
    drawerWidth: number;
    handleDrawerClose: () => void;
    handleDrawerTransitionEnd: () => void;
};

type NavLink = {
    name: string;
    href: string;
    icon: SvgIconComponent;
};

const navLinks: NavLink[] = [
    { name: "Dashboard", href: "/management/", icon: DashboardOutlined },
    { name: "Photos", href: "/management/photos", icon: PhotoOutlined },
    { name: "Tools", href: "/management/tools", icon: AutoFixHighOutlined },
    {
        name: "Tags",
        href: "/management/tags",
        icon: StyleOutlined,
    },
    {
        name: "FAQs",
        href: "/management/faqs",
        icon: HelpCenterOutlined,
    },
    { name: "Users", href: "/management/users", icon: PeopleOutlineOutlined },
];

const AdminDrawer = ({
    mobileOpen,
    drawerWidth,
    handleDrawerClose,
    handleDrawerTransitionEnd,
}: AdminDrawerProps) => {
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
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
                <DrawerContent />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                <DrawerContent />
            </Drawer>
        </Box>
    );
};

const DrawerContent = () => {
    const location = useLocation();

    return (
        <>
            {/* <Toolbar /> */}
            <Link href="/" sx={{ p: 2, display: "block" }}>
                <Image
                    src="/images/logo.svg"
                    alt="logo"
                    sx={{ width: "100%", maxWidth: "150px" }}
                />
            </Link>
            <Divider />
            <List>
                {navLinks.map((nav) => (
                    <Link href={nav.href} key={v4()}>
                        <ListItem key={v4()}>
                            <ListItemButton
                                sx={{ borderRadius: "12px" }}
                                selected={location.pathname === nav.href}
                            >
                                <ListItemIcon>
                                    <SvgIcon
                                        component={nav.icon}
                                        sx={{
                                            fontSize: 30,
                                            color: "inherit",
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={nav.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </>
    );
};

export default AdminDrawer;
