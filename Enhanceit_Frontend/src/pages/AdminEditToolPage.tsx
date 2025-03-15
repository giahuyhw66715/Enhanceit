import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import AdminToolForm from "../components/form/AdminToolForm";
import { useParams } from "react-router-dom";
import { getToolBySlug } from "../lib/actions/tools";
import Loading from "../components/common/Loading";
import { useQuery } from "@tanstack/react-query";
import NotFoundPage from "./NotFoundPage";

const AdminEditToolPage = () => {
    const { slug } = useParams();
    const {
        data: tool,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tool", slug],
        queryFn: () => getToolBySlug(slug!),
        enabled: !!slug,
    });

    if (isLoading) return <Loading />;
    if (!tool) return null;
    if (isError) return <NotFoundPage />;

    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Edit Tool" />
            <Spacer y={5} />
            <AdminToolForm tool={tool} />
        </Container>
    );
};

export default AdminEditToolPage;
