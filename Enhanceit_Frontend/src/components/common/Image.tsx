import { Box, SxProps, Theme } from "@mui/material";

type ImageProps = {
    src: string;
    alt?: string;
    sx?: SxProps<Theme>;
    className?: string;
    onLoad?: () => void;
};
const Image = ({
    src,
    alt = "Image",
    sx,
    className,
    onLoad = () => {},
}: ImageProps) => {
    return (
        <Box
            component="img"
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            onLoad={() => onLoad?.()}
            sx={{
                objectFit: "cover",
                width: "100%",
                borderRadius: "12px",
                ...sx,
            }}
        />
    );
};

export default Image;
