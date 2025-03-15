import { Grid2, ImageListItemBar } from "@mui/material";
import Heading from "../common/Heading";
import Image from "../common/Image";
import Spacer from "../common/Spacer";

const DetailDemoTool = ({
    originalImage,
    editedImage,
}: {
    originalImage: string;
    editedImage: string;
}) => {
    return (
        <div>
            <Heading title="Amazing Image Enhancement" />
            <Spacer y={5} />
            <Grid2 container spacing={3}>
                <Grid2 size={6} sx={{ position: "relative" }}>
                    <Image
                        src={originalImage}
                        alt="Original Image"
                        sx={{ borderRadius: "12px" }}
                    />
                    <ImageListItemBar
                        position="top"
                        title="Before"
                        sx={{
                            borderRadius: "12px",
                            width: "fit-content",
                            px: 5,
                            "& .MuiImageListItemBar-title": {
                                fontSize: 20,
                            },
                        }}
                    />
                </Grid2>
                <Grid2 size={6} sx={{ position: "relative" }}>
                    <Image
                        src={editedImage}
                        alt="Edited Image"
                        className="caro-background"
                        sx={{ borderRadius: "12px", boxShadow: 2 }}
                    />
                    <ImageListItemBar
                        position="top"
                        title="After"
                        sx={{
                            borderRadius: "12px",
                            width: "fit-content",
                            px: 5,
                            ml: "auto",
                            "& .MuiImageListItemBar-title": {
                                fontSize: 20,
                            },
                        }}
                    />
                </Grid2>
            </Grid2>
        </div>
    );
};

export default DetailDemoTool;
