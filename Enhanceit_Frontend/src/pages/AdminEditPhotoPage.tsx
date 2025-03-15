import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import AdminPhotoForm from "../components/form/AdminPhotoForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPhotoById } from "../lib/actions/photos";
import Loading from "../components/common/Loading";
import NotFoundPage from "./NotFoundPage";

const AdminEditPhotoPage = () => {
    const { id } = useParams();

    const {
        data: photo,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["photo", id],
        queryFn: () => getPhotoById(id!),
    });

    if (isLoading) return <Loading />;
    if (isError) return <NotFoundPage />;
    if (!photo) return null;

    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Add New Photo" />
            <Spacer y={5} />
            <AdminPhotoForm photo={photo} />
        </Container>
    );
};

export default AdminEditPhotoPage;
