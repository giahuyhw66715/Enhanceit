import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import AdminTagForm from "../components/form/AdminTagForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTagBySlug } from "../lib/actions/tags";
import Loading from "../components/common/Loading";
import NotFoundPage from "./NotFoundPage";

const AdminEditTagPage = () => {
    const { slug } = useParams();
    const {
        data: tag,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tag", slug],
        queryFn: () => getTagBySlug(slug!),
    });

    if (isLoading) return <Loading />;
    if (isError) return <NotFoundPage />;
    if (!tag) return null;

    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Edit Tag" />
            <Spacer y={5} />
            <AdminTagForm tag={tag} />
        </Container>
    );
};

export default AdminEditTagPage;
