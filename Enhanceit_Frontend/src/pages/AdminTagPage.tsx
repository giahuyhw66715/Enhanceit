import { Button, Container, Stack } from "@mui/material";
import Heading from "../components/common/Heading";
import AdminTable from "../components/admin/AdminTable";
import Spacer from "../components/common/Spacer";
import { tagColumns } from "../lib/columns";
import { deleteTag, getAllTags } from "../lib/actions/tags";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";
import { ErrorResponse } from "../lib/types";
import NotFoundPage from "./NotFoundPage";

const AdminTagPage = () => {
    const {
        data: tags,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tags"],
        queryFn: getAllTags,
    });
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => {
            return deleteTag(id);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["tags"] });
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
                <Heading title="Manage Tags" />
                <Button
                    size="large"
                    href="/management/tags/add"
                    variant="contained"
                >
                    Add Tag
                </Button>
            </Stack>
            <Spacer y={5} />
            <AdminTable
                rows={tags}
                columns={tagColumns}
                editTag="tags"
                onDelete={(slug) => mutate(slug)}
                isDeleting={isPending}
            />
        </Container>
    );
};

export default AdminTagPage;
