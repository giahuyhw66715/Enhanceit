import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import AdminUserForm from "../components/form/AdminUserForm";

const AdminAddUserPage = () => {
    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Add New User" />
            <Spacer y={5} />
            <AdminUserForm />
        </Container>
    );
};

export default AdminAddUserPage;
