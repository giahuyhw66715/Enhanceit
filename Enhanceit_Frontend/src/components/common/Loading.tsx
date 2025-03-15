import { CircularProgress, Stack, SxProps, Theme } from "@mui/material";

const Loading = ({ loadingStyles }: { loadingStyles?: SxProps<Theme> }) => {
    return (
        <Stack
            direction="row"
            sx={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress sx={loadingStyles} />
        </Stack>
    );
};

export default Loading;
