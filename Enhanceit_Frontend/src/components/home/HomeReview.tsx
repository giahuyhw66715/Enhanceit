import { Box, Grid2 } from "@mui/material";
import Heading from "../common/Heading";
import ReviewCard from "../card/ReviewCard";
import { reviews } from "../../lib/constants";
import { v4 } from "uuid";

const HomeReview = () => {
    return (
        <Box component="div" sx={{ mt: 15, py: 10, px: { xs: 4, md: 10 } }}>
            <Heading title="What our customers say" />
            <Grid2 container spacing={3} sx={{ mt: 5 }}>
                {reviews.map((review) => (
                    <Grid2 key={v4()} size={{ xs: 12, sm: 6, md: 4 }}>
                        <ReviewCard review={review} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default HomeReview;
