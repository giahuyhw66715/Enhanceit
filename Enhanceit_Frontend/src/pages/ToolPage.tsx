import { Container, Grid2 } from "@mui/material";
import ToolCard from "../components/card/ToolCard";
import Heading from "../components/common/Heading";
import { useQuery } from "@tanstack/react-query";
import { getAllTools } from "../lib/actions/tools";
import NotFoundPage from "./NotFoundPage";
import { v4 } from "uuid";
import ToolCardSkeleton from "../components/card/ToolCardSkeleton";

const ToolPage = () => {
    const {
        data: tools,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tools"],
        queryFn: getAllTools,
    });

    if (isError) return <NotFoundPage />;

    return (
        <Container component="div">
            <Heading title="Explore our tools" />
            <Grid2 container spacing={3} sx={{ mt: 5 }}>
                {isLoading
                    ? Array.from({ length: 3 }).map(() => (
                          <Grid2 key={v4()} size={4}>
                              <ToolCardSkeleton />
                          </Grid2>
                      ))
                    : tools?.map((tool) => (
                          <Grid2 key={tool.id} size={{ xs: 12, sm: 6, md: 4 }}>
                              <ToolCard tool={tool} />
                          </Grid2>
                      ))}
            </Grid2>
        </Container>
    );
};

export default ToolPage;
