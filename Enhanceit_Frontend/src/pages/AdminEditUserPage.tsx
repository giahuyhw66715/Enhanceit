import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/common/Loading";
import { getUserById } from "../lib/actions/users";
import AdminUserForm from "../components/form/AdminUserForm";
import NotFoundPage from "./NotFoundPage";

const AdminEditUserPage = () => {
    const { id } = useParams();
    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id!),
    });

    if (isLoading) return <Loading />;
    if (isError) return <NotFoundPage />;
    if (!user) return null;

    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Edit User" />
            <Spacer y={5} />
            <AdminUserForm user={user} />
        </Container>
    );
};

export default AdminEditUserPage;
