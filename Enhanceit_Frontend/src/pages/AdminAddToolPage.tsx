import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import AdminToolForm from "../components/form/AdminToolForm";

const AdminAddToolPage = () => {
    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Add New Tool" />
            <Spacer y={5} />
            <AdminToolForm />
        </Container>
    );
};

export default AdminAddToolPage;
