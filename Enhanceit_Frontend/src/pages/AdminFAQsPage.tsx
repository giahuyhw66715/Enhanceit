import { Button, Container, Stack } from "@mui/material";
import Heading from "../components/common/Heading";
import AdminTable from "../components/admin/AdminTable";
import Spacer from "../components/common/Spacer";
import { faqsColumns } from "../lib/columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/common/Loading";
import toast from "react-hot-toast";
import { ErrorResponse, FAQs } from "../lib/types";
import { getAllTools } from "../lib/actions/tools";
import { v4 } from "uuid";
import { deleteFAQ } from "../lib/actions/faqs";
import NotFoundPage from "./NotFoundPage";

type Row = FAQs & { id: string; toolName: string; toolSlug: string };

const AdminFAQsPage = () => {
    const {
        data: tools,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tools"],
        queryFn: getAllTools,
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => {
            const row = rows?.find((row) => row?.id === id);
            const faq: FAQs = {
                question: row?.question || "",
                answer: row?.answer || "",
            };
            return deleteFAQ(row?.toolSlug ?? "", faq);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["tools"] });
        },
        onError: (error: ErrorResponse) => {
            toast.error(error.response.data.detail);
        },
    });

    const rows: Row[] =
        tools?.flatMap(
            (tool) =>
                tool?.faqs?.map((faq) => ({
                    id: v4(),
                    toolName: tool.title,
                    toolSlug: tool.slug,
                    question: faq.question,
                    answer: faq.answer,
                })) ?? []
        ) ?? [];

    if (isLoading) return <Loading />;
    if (isError) return <NotFoundPage />;

    return (
        <Container>
            <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
                <Heading title="Manage FAQs" />
                <Button
                    size="large"
                    href="/management/faqs/add"
                    variant="contained"
                >
                    Add FAQ
                </Button>
            </Stack>
            <Spacer y={5} />
            <AdminTable
                rows={rows || []}
                columns={faqsColumns}
                editTag="faqs"
                onDelete={(id: string) => mutate(id)}
                isDeleting={isPending}
            />
        </Container>
    );
};

export default AdminFAQsPage;
