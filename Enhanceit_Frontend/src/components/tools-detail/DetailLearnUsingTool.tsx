import Heading from "../common/Heading";
import { Grid2 } from "@mui/material";
import { tutorials } from "../../lib/constants";
import TutorialCard from "../card/TutorialCard";
import { v4 } from "uuid";

const DetailLearnUsingTool = () => {
    return (
        <>
            <Heading title="Learn how to use our tool" />
            <Grid2 container spacing={3} sx={{ mt: 5 }}>
                {tutorials.map((tutorial) => (
                    <Grid2 key={v4()} size={{ xs: 12, sm: 6, md: 4 }}>
                        <TutorialCard
                            step={tutorial.step}
                            title={tutorial.title}
                            description={tutorial.description}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </>
    );
};

export default DetailLearnUsingTool;
