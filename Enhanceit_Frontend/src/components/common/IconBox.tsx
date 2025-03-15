import { SvgIconComponent } from "@mui/icons-material";
import { Stack, SvgIcon, Typography, useTheme } from "@mui/material";

const IconBox = ({
    icon,
    title,
    onClick,
    isActive = false,
}: {
    icon: SvgIconComponent;
    title: string;
    onClick?: () => void;
    isActive?: boolean;
}) => {
    const theme = useTheme();

    return (
        <Stack
            component="div"
            sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                alignItems: "center",
                color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                cursor: "pointer",
                px: 3,
                py: 2,
                transition: "all 0.3s ease-in-out",
                ":hover": {
                    color: theme.palette.primary.main,
                },
            }}
            boxShadow={3}
            direction="row"
            spacing={2}
            onClick={onClick}
        >
            <SvgIcon
                component={icon}
                sx={{
                    fontSize: 35,
                    color: "inherit",
                }}
            />
            <Typography
                sx={{ fontSize: 18, fontWeight: 500, color: "inherit" }}
            >
                {title}
            </Typography>
        </Stack>
    );
};

export default IconBox;
