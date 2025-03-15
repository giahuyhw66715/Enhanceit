import { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import UploadFile from "../common/UploadFile";
import { useMutation } from "@tanstack/react-query";
import { processImage } from "../../lib/actions/tools";
import { DownloadOutlined } from "@mui/icons-material";
import Spacer from "../common/Spacer";
import { ErrorResponse } from "../../lib/types";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

type Status = "before" | "after";

const DetailProcessImage = ({ slug }: { slug: string }) => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [editedStatus, setEditedStatus] = useState<Status>("after");
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const { user } = useAuth();

    const { mutate, isPending } = useMutation({
        mutationFn: (file: File) => {
            return processImage(file, slug);
        },
        onSuccess: (data: Blob) => {
            setEditedImage(URL.createObjectURL(data));
        },
        onError: (error: ErrorResponse) => {
            toast.error(error.response.data.detail);
        },
    });

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return toast.error("Please login to use this feature");
        const imageUrl = URL.createObjectURL(event.target.files![0]);
        setOriginalImage(imageUrl);
        setFileName(event.target.files![0].name);
        mutate(event.target.files![0]);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 650,
                mx: "auto",
            }}
        >
            {originalImage && (
                <Tabs
                    value={editedStatus}
                    onChange={(_, value: Status) => setEditedStatus(value)}
                    sx={{
                        "& .MuiTabs-flexContainer": {
                            justifyContent: "end",
                        },
                    }}
                >
                    <Tab value="before" label="before" />
                    <Tab value="after" label="after" />
                </Tabs>
            )}
            <Spacer y={3} />
            <Stack
                component="div"
                className="caro-background"
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 3,
                    borderRadius: "12px",
                    aspectRatio: "3/2",
                    py: 5,
                    position: "relative",
                }}
            >
                {isPending && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "#fafafa",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 3,
                            zIndex: 10,
                            borderRadius: "12px",
                        }}
                    >
                        <CircularProgress color="inherit" />
                        <Typography variant="h6">
                            Please wait a moment...
                        </Typography>
                    </Box>
                )}
                <UploadFile
                    image={
                        editedStatus === "after" && editedImage && !isPending
                            ? editedImage
                            : originalImage
                    }
                    onChange={handleUploadImage}
                    imageStyle={{
                        height: "100%",
                        width: "100%",
                        opacity: isPending ? 0.5 : 1,
                        borderRadius: "none",
                    }}
                    onDelete={() => {
                        setOriginalImage(null);
                        setEditedImage(null);
                        setFileName(null);
                    }}
                />
            </Stack>
            {originalImage && (
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "center",
                        mt: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        href={
                            editedStatus === "after" && editedImage
                                ? editedImage
                                : "#"
                        }
                        download={editedImage && fileName}
                        startIcon={<DownloadOutlined />}
                        sx={{ p: 2 }}
                    >
                        Download New Image
                    </Button>
                </Stack>
            )}
        </Box>
    );
};

export default DetailProcessImage;
