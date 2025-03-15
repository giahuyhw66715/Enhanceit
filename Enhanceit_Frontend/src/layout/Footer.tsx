import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{ p: 5, bgcolor: "#000", color: "#fff", mt: 10 }}
        >
            <Typography variant="body2" align="center">
                Copyright {new Date().getFullYear()} EnhanceIt - All rights
                reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
