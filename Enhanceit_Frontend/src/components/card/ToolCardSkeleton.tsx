import { Card, CardContent, Skeleton } from "@mui/material";

const ToolCardSkeleton = () => {
    return (
        <Card sx={{ height: "100%" }}>
            <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: "12px" }}
            />
            <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" height={50} />
            </CardContent>
        </Card>
    );
};

export default ToolCardSkeleton;
