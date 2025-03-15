import { Box, Stack } from "@mui/material";
import IntroCard from "../card/IntroCard";
import { intros } from "../../lib/constants";

const HomeIntro = () => {
    return (
        <Box component="div" sx={{ pt: 10 }}>
            <Stack spacing={7} sx={{ mt: 5 }}>
                {intros.map((intro, index) => (
                    <IntroCard
                        key={index}
                        title={intro.title}
                        description={intro.description}
                        image={intro.image}
                        isLeftImage={index % 2 === 0}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default HomeIntro;
