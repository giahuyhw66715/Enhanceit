import {
    Avatar,
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { Review } from "../../lib/types";

const ReviewCard = ({ review }: { review: Review }) => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                backgroundColor: theme.palette.gray.light,
                p: 3,
            }}
        >
            <CardContent>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    ‟ <br />
                    {review.content}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 5,
                    }}
                >
                    <Stack spacing={1}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            <Typography color="primary" component="span">
                                @{" "}
                            </Typography>
                            {review.author.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                        >
                            {review.author.role} - {review.author.company}
                        </Typography>
                    </Stack>
                    <Avatar alt="John Doe" src={review.author.avatar} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
