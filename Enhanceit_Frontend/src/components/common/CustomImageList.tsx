import {
    Grid2,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ImageListProps,
    Skeleton,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { PartialBy, Photo } from "../../lib/types";
import { useNavigate } from "react-router-dom";
import { theme } from "../../theme";
import { useState } from "react";
import { v4 } from "uuid";

type Props = {
    photos: Photo[];
    imageListProps?: PartialBy<ImageListProps, "children">;
    width?: number;
};

const CustomImageList = ({
    photos,
    imageListProps = { variant: "woven" },
    width = 248,
}: Props) => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));
    const totalImages = photos.length;
    const [loadedImages, setLoadedImages] = useState(0);

    const handleImageLoad = () => {
        setLoadedImages((prev) => prev + 1);
    };
    const allLoaded = totalImages === loadedImages;

    return (
        <>
            {!allLoaded && (
                <Grid2 spacing={2} container>
                    {Array.from({ length: 6 }).map(() => (
                        <Grid2 key={v4()} size={{ xs: 12, sm: 6, md: 4 }}>
                            <Skeleton
                                key={v4()}
                                variant="rectangular"
                                height={400}
                                sx={{ borderRadius: "12px" }}
                            />
                        </Grid2>
                    ))}
                </Grid2>
            )}
            <ImageList
                cols={isMobile ? 1 : isTablet ? 2 : 3}
                gap={8}
                {...imageListProps}
            >
                {photos.map((item) => (
                    <ImageListItem
                        key={item.id}
                        sx={{
                            overflow: "hidden",
                            opacity: allLoaded ? 1 : 0,
                            transition: "all 0.3s ease-in-out",
                        }}
                    >
                        <img
                            srcSet={`${item.url}?w=${width}&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.url}?w=${width}&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            className="zoom-image"
                            style={{
                                borderRadius: "12px",
                            }}
                            onLoad={handleImageLoad}
                            onClick={() => navigate(`/photos/${item.id}`)}
                        />
                        <ImageListItemBar
                            position="top"
                            title={item.title}
                            actionIcon={
                                <Typography sx={{ pr: 2, color: "#fff" }}>
                                    {item.resolution}
                                </Typography>
                            }
                            sx={{
                                borderRadius: "12px",
                                gap: 2,
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};

export default CustomImageList;
