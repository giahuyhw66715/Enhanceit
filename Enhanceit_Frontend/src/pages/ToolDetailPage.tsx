import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getToolBySlug } from "../lib/actions/tools";
import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import DetailProcessImage from "../components/tools-detail/DetailProcessImage";
import Spacer from "../components/common/Spacer";
import DetailLearnUsingTool from "../components/tools-detail/DetailLearnUsingTool";
import DetailIntroTool from "../components/tools-detail/DetailIntroTool";
import DetailDemoTool from "../components/tools-detail/DetailDemoTool";
import Heading from "../components/common/Heading";
import FAQAccordion from "../components/common/FAQAccordion";
import NotFoundPage from "./NotFoundPage";

const ToolDetailPage = () => {
    const params = useParams();

    const {
        data: tool,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tool", params.slug],
        queryFn: () => getToolBySlug(params.slug!),
    });

    if (!tool || isError) return <NotFoundPage />;

    return (
        <Container>
            {isLoading && <Loading />}
            <DetailIntroTool
                title={tool.title}
                description={tool.description}
            />
            <Spacer y={7} />
            <DetailProcessImage slug={tool.slug} />
            <Spacer y={10} />
            <DetailLearnUsingTool />
            <Spacer y={10} />
            <DetailDemoTool
                originalImage={tool.input}
                editedImage={tool.output}
            />
            <Spacer y={10} />
            <Box>
                <Heading title="Frequently Asked Questions" />
                <FAQAccordion faqs={tool.faqs || []} />
            </Box>
        </Container>
    );
};

export default ToolDetailPage;
