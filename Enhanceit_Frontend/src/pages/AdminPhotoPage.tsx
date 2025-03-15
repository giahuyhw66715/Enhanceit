import { Button, Container, Stack } from "@mui/material";
import Heading from "../components/common/Heading";
import AdminTable from "../components/admin/AdminTable";
import Spacer from "../components/common/Spacer";
import { deletePhoto, getAllPhotos } from "../lib/actions/photos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { photoColumns } from "../lib/columns";
import Loading from "../components/common/Loading";
import { ErrorResponse } from "../lib/types";
import toast from "react-hot-toast";
import NotFoundPage from "./NotFoundPage";

const AdminPhotoPage = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["photos"],
        queryFn: () => getAllPhotos({ limit: 100 }),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => {
            return deletePhoto(id);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["photos"] });
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
                <Heading title="Manage Photos" />
                <Button
                    size="large"
                    href="/management/photos/add"
                    variant="contained"
                >
                    Add Photo
                </Button>
            </Stack>
            <Spacer y={5} />
            <AdminTable
                rows={data?.data}
                columns={photoColumns}
                editTag="photos"
                onDelete={(id: string) => mutate(id)}
                isDeleting={isPending}
            />
        </Container>
    );
};

export default AdminPhotoPage;
