import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import Spacer from "../common/Spacer";
import { Photo } from "../../lib/types";
import {
    AspectRatioOutlined,
    FileDownloadOutlined,
    FolderOutlined,
    PersonOutlined,
} from "@mui/icons-material";
import formatBytes from "../../utils/formatBytes";

const PhotoMeta = ({ photo }: { photo: Photo }) => {
    const downloadLink = photo.url.replace(
        "/upload/",
        "/upload/fl_attachment/"
    );

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography sx={{ fontWeight: 600 }} variant="h4">
                    {photo.title}
                </Typography>
            </Stack>
            <Spacer y={3} />
            <Stack spacing={2}>
                <Divider />
                <Stack direction="row" spacing={1}>
                    {photo.tags.map((tag) => (
                        <Chip
                            key={tag.slug}
                            label={tag.name}
                            color="secondary"
                        />
                    ))}
                </Stack>
                <Divider />
                <Stack
                    direction="row"
                    sx={{ flexWrap: "wrap", rowGap: 2, columnGap: 3 }}
                >
                    <Chip
                        icon={<PersonOutlined />}
                        label={photo.author || "Anonymous"}
                    />
                    <Chip
                        icon={<AspectRatioOutlined />}
                        label={photo.resolution}
                    />
                    <Chip
                        icon={<FolderOutlined />}
                        label={`${formatBytes(photo.file_size)} bytes`}
                    />
                </Stack>
                <Spacer />
                <Button
                    size="large"
                    href={downloadLink}
                    download
                    variant="contained"
                    startIcon={<FileDownloadOutlined />}
                    sx={{ py: 2 }}
                >
                    Download for free
                </Button>
            </Stack>
        </>
    );
};

export default PhotoMeta;
