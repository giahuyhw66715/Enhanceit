import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import AdminUserForm from "../components/form/AdminUserForm";
import useAuth from "../hooks/useAuth";
import UnauthorizedPage from "./UnauthorizedPage";

const UpdateProfilePage = () => {
    const { user } = useAuth();
    if (!user) return <UnauthorizedPage />;

    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Profile" />
            <Spacer y={5} />
            <AdminUserForm user={user} />
        </Container>
    );
};

export default UpdateProfilePage;
