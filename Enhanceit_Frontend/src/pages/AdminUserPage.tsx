import { Button, Container, Stack } from "@mui/material";
import Heading from "../components/common/Heading";
import AdminTable from "../components/admin/AdminTable";
import Spacer from "../components/common/Spacer";
import { userColumns } from "../lib/columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";
import { ErrorResponse } from "../lib/types";
import { deleteUser, getAllUsers } from "../lib/actions/users";
import NotFoundPage from "./NotFoundPage";

const AdminUserPage = () => {
    const {
        data: users,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => {
            return deleteUser(id);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: ErrorResponse) => {
            toast.error(error.response.data.detail);
        },
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
                <Heading title="Manage Users" />
                <Button
                    size="large"
                    href="/management/users/add"
                    variant="contained"
                >
                    Add User
                </Button>
            </Stack>
            <Spacer y={5} />
            <AdminTable
                rows={users}
                columns={userColumns}
                editTag="users"
                onDelete={(id) => mutate(id)}
                isDeleting={isPending}
            />
        </Container>
    );
};

export default AdminUserPage;
