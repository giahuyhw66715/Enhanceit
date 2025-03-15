import { Box, Grid2, Typography } from "@mui/material";
import useMedia from "../../hooks/useMedia";
import Image from "../common/Image";

const HomeBanner = () => {
    const { isTablet } = useMedia();

    return (
        <Box>
            <Box
                component="img"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    display: isTablet ? "none" : "block",
                }}
                src="/images/side-wave_background.svg"
                alt="unsplash image"
            />
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Typography variant="h2" sx={{ fontWeight: 500 }}>
                        <Typography
                            variant="h2"
                            component="span"
                            color="primary"
                            sx={{ fontWeight: 500 }}
                        >
                            EnhanceIt
                        </Typography>{" "}
                        Upgrade Your Images with AI
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ mt: 3 }}
                        color="textSecondary"
                    >
                        Effortlessly edit, upscale, and transform your photos
                        with cutting-edge AI technology.
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Image src="/images/banner.svg" alt="intro image" sx={{}} />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default HomeBanner;
