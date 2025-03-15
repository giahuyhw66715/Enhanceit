import { Button, Container, Stack } from "@mui/material";
import Heading from "../components/common/Heading";
import AdminTable from "../components/admin/AdminTable";
import Spacer from "../components/common/Spacer";
import { toolColumns } from "../lib/columns";
import { getAllTools } from "../lib/actions/tools";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/common/Loading";
import NotFoundPage from "./NotFoundPage";

const AdminToolPage = () => {
    const {
        data: tools,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tools"],
        queryFn: getAllTools,
    });

    if (isLoading) return <Loading />;
    if (isError) return <NotFoundPage />;

    return (
        <Container>
            <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
                <Heading title="Admin Tool" />
                <Button
                    size="large"
                    href="/management/tools/add"
                    variant="contained"
                >
                    Add Tool
                </Button>
            </Stack>
            <Spacer y={5} />
            <AdminTable
                rows={tools || []}
                columns={toolColumns}
                editTag="tools"
            />
        </Container>
    );
};

export default AdminToolPage;
