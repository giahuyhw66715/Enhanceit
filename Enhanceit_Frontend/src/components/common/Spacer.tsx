import { Box } from "@mui/material";

type SpacerProps = {
    x?: number;
    y?: number;
};
const Spacer = ({ x, y }: SpacerProps) => {
    return <Box sx={{ mt: y, ml: x }} />;
};

export default Spacer;
