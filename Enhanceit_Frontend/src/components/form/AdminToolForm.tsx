import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { InferTool, Tool } from "../../lib/types";
import { toolSchema } from "../../lib/schema";
import { addTool, editTool } from "../../lib/actions/tools";
import UploadFile from "../common/UploadFile";
import ErrorMessage from "../common/ErrorMessage";
import slugify from "../../utils/slugify";
import { useNavigate } from "react-router-dom";

const AdminToolForm = ({ tool }: { tool?: Tool }) => {
    const [image, setImage] = useState<string | null>(tool?.image || null);
    const [input, setInput] = useState<string | null>(tool?.input || null);
    const [output, setOutput] = useState<string | null>(tool?.output || null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm<InferTool>({
        resolver: zodResolver(toolSchema),
        defaultValues: {
            title: tool?.title,
            description: tool?.description,
            image: tool?.image,
            input: tool?.input,
            output: tool?.output,
        },
    });

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: InferTool) => {
            return tool ? editTool(tool.slug, data) : addTool(data);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            if (tool) {
                return navigate(
                    `/management/tools/edit/${slugify(getValues("title"))}`
                );
            }
            reset();
            setImage(null);
            setInput(null);
            setOutput(null);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setImage(URL.createObjectURL(file!));
        setValue("image", file!);
    };

    const handleInputImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        setInput(URL.createObjectURL(file!));
        setValue("input", file!);
    };

    const handleOutputImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        setOutput(URL.createObjectURL(file!));
        setValue("output", file!);
    };
    return (
        <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit((data) => mutate(data))}
        >
            <TextField
                label="Tool Name"
                variant="outlined"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
            />
            <TextField
                multiline
                rows={4}
                label="Description"
                variant="outlined"
                {...register("description")}
            />
            <UploadFile
                image={image}
                onChange={handleImageChange}
                onDelete={() => setImage(null)}
                buttonColor="black"
                fullWidthButton
            />
            <ErrorMessage errors={errors} field="image" />
            <UploadFile
                image={input}
                onChange={handleInputImageChange}
                onDelete={() => setInput(null)}
                displayText="Demo Input Image"
                buttonColor="black"
                fullWidthButton
            />
            <ErrorMessage errors={errors} field="input" />
            <UploadFile
                image={output}
                onChange={handleOutputImageChange}
                onDelete={() => setOutput(null)}
                displayText="Demo Output Image"
                buttonColor="black"
                fullWidthButton
            />
            <ErrorMessage errors={errors} field="output" />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ p: 1 }}
                size="large"
                loading={isPending}
            >
                {tool ? "Edit Tool" : "Add Tool"}
            </Button>
        </Stack>
    );
};

export default AdminToolForm;
