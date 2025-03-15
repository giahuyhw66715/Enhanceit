import { Container } from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import AdminPhotoForm from "../components/form/AdminPhotoForm";

const AdminAddPhotoPage = () => {
    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Add New Photo" />
            <Spacer y={5} />
            <AdminPhotoForm />
        </Container>
    );
};

export default AdminAddPhotoPage;
