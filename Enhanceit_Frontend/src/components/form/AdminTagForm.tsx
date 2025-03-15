import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { ErrorResponse, InferTag, Tag } from "../../lib/types";
import { tagSchema } from "../../lib/schema";
import { addTag, editTag } from "../../lib/actions/tags";
import { useNavigate } from "react-router-dom";
import slugify from "../../utils/slugify";

const AdminTagForm = ({ tag }: { tag?: Tag }) => {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<InferTag>({
        resolver: zodResolver(tagSchema),
        defaultValues: {
            name: tag?.name,
        },
    });

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: InferTag) => {
            return tag ? editTag(tag.slug, data) : addTag(data);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            if (tag)
                return navigate(
                    `/management/tags/edit/${slugify(getValues("name"))}`
                );
            reset();
        },
        onError: (error: ErrorResponse) => {
            toast.error(error.response.data.detail);
        },
    });

    return (
        <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit((data) => mutate(data))}
        >
            <TextField
                label="Tag Name"
                variant="outlined"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ p: 1 }}
                size="large"
                loading={isPending}
            >
                {tag ? "Edit" : "Add"} Tag
            </Button>
        </Stack>
    );
};

export default AdminTagForm;
