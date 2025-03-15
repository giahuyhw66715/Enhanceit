import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import AdminTagForm from "../components/form/AdminTagForm";

const AdminAddTagPage = () => {
    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Add New Tag" />
            <Spacer y={5} />
            <AdminTagForm />
        </Container>
    );
};

export default AdminAddTagPage;
