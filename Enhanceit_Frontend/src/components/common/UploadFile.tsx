import { Box, Button, IconButton, SxProps, Theme } from "@mui/material";
import Image from "./Image";
import { AddPhotoAlternate, Cancel } from "@mui/icons-material";
import VisuallyHiddenInput from "./VisuallyHiddenInput";
import { ButtonProps } from "@mui/material/Button/Button";

type UploadFileProps = {
    image: string | null;
    displayText?: string;
    imageStyle?: SxProps<Theme>;
    buttonColor?: ButtonProps["color"];
    fullWidthButton?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: () => void;
};
const UploadFile = ({
    image,
    displayText = "Upload Your Image",
    imageStyle,
    buttonColor = "primary",
    fullWidthButton = false,
    onChange = () => {},
    onDelete = () => {},
}: UploadFileProps) => {
    return (
        <Box
            component="div"
            sx={{
                position: "relative",
                width: "100%",
                textAlign: "center",
            }}
        >
            {image ? (
                <>
                    <IconButton
                        color="error"
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                        }}
                        onClick={onDelete}
                        disabled={!image}
                    >
                        <Cancel color="error" />
                    </IconButton>
                    <Image src={image} alt="Upload image" sx={imageStyle} />
                </>
            ) : (
                <Button
                    variant="contained"
                    size="large"
                    role={undefined}
                    tabIndex={-1}
                    component="label"
                    color={buttonColor}
                    fullWidth={fullWidthButton}
                    startIcon={<AddPhotoAlternate />}
                    sx={{ p: 2 }}
                >
                    {displayText}
                    <VisuallyHiddenInput type="file" onChange={onChange} />
                </Button>
            )}
        </Box>
    );
};

export default UploadFile;
