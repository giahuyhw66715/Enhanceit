import { Box, Button, Grid2 } from "@mui/material";
import Heading from "../common/Heading";
import ToolCard from "../card/ToolCard";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getAllTools } from "../../lib/actions/tools";
import Loading from "../common/Loading";
import Spacer from "../common/Spacer";

const HomeExplore = () => {
    const {
        data: tools,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["tools"],
        queryFn: getAllTools,
    });

    if (isError) {
        toast.error(error?.message);
        return;
    }

    return (
        <Box component="div">
            <Heading title="Explore our tools" />
            {isLoading && <Loading />}
            <Grid2 container spacing={3} sx={{ mt: 5 }}>
                {!isLoading &&
                    tools &&
                    tools.slice(0, 3).map((tool) => (
                        <Grid2 key={tool.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <ToolCard tool={tool} />
                        </Grid2>
                    ))}
            </Grid2>
            <Spacer y={5} />
            <Box sx={{ textAlign: "center" }}>
                <Button
                    sx={{ py: 2 }}
                    href="/tools"
                    variant="contained"
                    size="large"
                >
                    Discover More Tools
                </Button>
            </Box>
        </Box>
    );
};

export default HomeExplore;
