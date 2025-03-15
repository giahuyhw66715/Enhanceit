import { SxProps, Theme, Typography } from "@mui/material";

const Heading = ({
    title,
    center = true,
    sx,
}: {
    title: string;
    center?: boolean;
    sx?: SxProps<Theme>;
}) => {
    return (
        <Typography
            variant="h3"
            sx={{
                fontWeight: 600,
                fontSize: 40,
                textAlign: center ? "center" : "left",
                ...sx,
            }}
        >
            {title}
        </Typography>
    );
};

export default Heading;
