import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import Heading from "../components/common/Heading";
import Spacer from "../components/common/Spacer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorResponse, InferFaq } from "../lib/types";
import { faqsSchema } from "../lib/schema";
import { addFAQ } from "../lib/actions/faqs";
import { getAllTools } from "../lib/actions/tools";
import ErrorMessage from "../components/common/ErrorMessage";
import { useState } from "react";

const AdminAddFAQsPage = () => {
    const [selectedTool, setSelectedTool] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InferFaq>({
        resolver: zodResolver(faqsSchema),
    });

    const {
        data: tools,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tools"],
        queryFn: () => getAllTools(),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: InferFaq) => {
            const { tool_slug, ...rest } = data;
            return addFAQ(tool_slug, rest);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            setSelectedTool("");
            reset();
        },
        onError: (error: ErrorResponse) => {
            toast.error(error.response.data.detail);
        },
    });

    return (
        <Container component="div" maxWidth="sm">
            <Heading title="Add New FAQ" />
            <Spacer y={5} />
            <Stack
                component="form"
                spacing={2}
                onSubmit={handleSubmit((data) => mutate(data))}
            >
                <FormControl fullWidth>
                    <InputLabel
                        id="tool-label"
                        color={errors.tool_slug ? "error" : "primary"}
                    >
                        Tool
                    </InputLabel>
                    <Select
                        labelId="tool-label"
                        {...register("tool_slug")}
                        error={!!errors.tool_slug}
                        disabled={isLoading || isError}
                        value={selectedTool}
                        onChange={(e) => setSelectedTool(e.target.value)}
                        label="Tool"
                    >
                        {tools?.map((tool) => (
                            <MenuItem key={tool.id} value={tool.slug}>
                                {tool.title}
                            </MenuItem>
                        ))}
                    </Select>
                    <ErrorMessage errors={errors} field="tool_slug" />
                </FormControl>
                <TextField
                    label="Question"
                    variant="outlined"
                    {...register("question")}
                    error={!!errors.question}
                    helperText={errors.question?.message}
                />
                <TextField
                    label="Answer"
                    variant="outlined"
                    {...register("answer")}
                    error={!!errors.answer}
                    helperText={errors.answer?.message}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ p: 1 }}
                    size="large"
                    loading={isPending}
                >
                    Add FAQ
                </Button>
            </Stack>
        </Container>
    );
};

export default AdminAddFAQsPage;
