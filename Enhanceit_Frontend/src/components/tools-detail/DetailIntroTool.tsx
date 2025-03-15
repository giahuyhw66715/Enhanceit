import Heading from "../common/Heading";
import { Typography } from "@mui/material";

const DetailIntroTool = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <>
            <Heading title={title} />
            <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                    mt: 3,
                    maxWidth: 600,
                    mx: "auto",
                    textAlign: "center",
                }}
            >
                {description}
            </Typography>
        </>
    );
};

export default DetailIntroTool;
