import { Box, Grid2, Stack, Typography } from "@mui/material";
import Heading from "../common/Heading";
import IconBox from "../common/IconBox";
import Image from "../common/Image";
import { jobs } from "../../lib/constants";
import { useState } from "react";
import useMedia from "../../hooks/useMedia";

const leftJobs = jobs.slice(0, jobs.length / 2);
const rightJobs = jobs.slice(jobs.length / 2, jobs.length);

const HomeSuitableJobs = () => {
    const [currentJobIndex, setCurrentJobIndex] = useState<number>(0);
    const { isTablet } = useMedia();

    return (
        <Box sx={{ py: 10 }}>
            <Heading title="Who is it made for?" />
            <Typography color="textSecondary" align="center" sx={{ mt: 2 }}>
                Whether you’re a seasoned photographer, a creative graphic
                designer, an innovative marketer, or running a dynamic eCommerce
                store, Removal.AI will seamlessly adapt to your specific needs.
            </Typography>
            <Grid2 container spacing={4} sx={{ mt: 5, alignItems: "center" }}>
                <Grid2 size={{ xs: 12, md: 3 }} sx={{ order: -2 }}>
                    <Stack direction={"column"} spacing={3}>
                        {leftJobs.map((job, index) => (
                            <IconBox
                                key={job.title}
                                icon={job.icon}
                                title={job.title}
                                onClick={() => setCurrentJobIndex(index)}
                                isActive={currentJobIndex === index}
                            />
                        ))}
                    </Stack>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={{ position: "relative" }}>
                    <Image
                        src={jobs[currentJobIndex]?.image || ""}
                        alt="suitable jobs"
                        sx={{
                            borderRadius: "12px",
                            width: "100%",
                            height: "400px",
                        }}
                    />
                    <Box
                        sx={{
                            bgcolor: "#fff",
                            boxShadow: 3,
                            borderRadius: "10px",
                            width: "90%",
                            mx: "auto",
                            p: 5,
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translate(-50%, -20%)",
                            zIndex: 10,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 600, mb: 2 }}
                        >
                            {jobs[currentJobIndex]?.title || ""}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            sx={{ fontWeight: 500 }}
                        >
                            {jobs[currentJobIndex]?.description || ""}
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2
                    size={{ xs: 12, md: 3 }}
                    sx={{ order: isTablet ? -1 : 1 }}
                >
                    <Stack direction={"column"} spacing={3}>
                        {rightJobs.map((job, index) => (
                            <IconBox
                                key={job.title}
                                icon={job.icon}
                                title={job.title}
                                onClick={() =>
                                    setCurrentJobIndex(index + leftJobs.length)
                                }
                                isActive={
                                    currentJobIndex === index + leftJobs.length
                                }
                            />
                        ))}
                    </Stack>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default HomeSuitableJobs;
