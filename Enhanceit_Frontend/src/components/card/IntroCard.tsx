import { Grid2, Typography } from "@mui/material";
import Image from "../common/Image";
import { BasicInfo } from "../../lib/types";
import useMedia from "../../hooks/useMedia";

type IntroCardProps = BasicInfo & {
    isLeftImage: boolean;
};

const IntroCard = ({
    title,
    description,
    image,
    isLeftImage = false,
}: IntroCardProps) => {
    const { isTablet } = useMedia();
    return (
        <Grid2 container spacing={3} sx={{ alignItems: "center" }}>
            <Grid2
                size={{ xs: 12, md: 6 }}
                sx={isTablet ? {} : isLeftImage ? { pl: 6 } : { pr: 6 }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ mt: 2, mb: 4 }}
                >
                    {description}
                </Typography>
            </Grid2>
            <Grid2
                size={{ xs: 12, md: 6 }}
                sx={{ order: isLeftImage && !isTablet ? -1 : 1 }}
            >
                <Image
                    src={image}
                    alt="unsplash image"
                    sx={{ borderRadius: "12px" }}
                />
            </Grid2>
        </Grid2>
    );
};

export default IntroCard;
