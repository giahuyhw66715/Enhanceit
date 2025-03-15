import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Theme,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorResponse, InferPhoto, Photo } from "../../lib/types";
import { photoSchema } from "../../lib/schema";
import { getAllTags } from "../../lib/actions/tags";
import { addPhoto, editPhoto } from "../../lib/actions/photos";
import ErrorMessage from "../common/ErrorMessage";
import UploadFile from "../common/UploadFile";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

const AdminPhotoForm = ({ photo }: { photo?: Photo }) => {
    const defaultTags = photo?.tags?.map((tag) => tag.slug);
    const [image, setImage] = useState<string | null>(photo?.url || null);
    const [selectedTags, setSelectedTags] = useState<string[]>(
        defaultTags || []
    );

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<InferPhoto>({
        resolver: zodResolver(photoSchema),
        defaultValues: {
            title: photo?.title,
            url: photo?.url,
            author: photo?.author,
            tags: defaultTags,
        },
    });

    const theme = useTheme();

    const {
        data: tags,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tags"],
        queryFn: () => getAllTags(),
    });

    const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (data: InferPhoto) => {
            return photo ? editPhoto(photo.id, data) : addPhoto(data);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            if (photo) return;
            reset();
            setImage(null);
            setSelectedTags([]);
        },
        onError: (error: ErrorResponse) => {
            toast.error(error.response.data.detail);
        },
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setImage(URL.createObjectURL(file!));
        setValue("url", file!);
    };

    return (
        <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit((data) => mutate(data))}
        >
            <TextField
                label="Title"
                variant="outlined"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
            />
            <TextField
                label="Author"
                variant="outlined"
                {...register("author")}
                error={!!errors.author}
                helperText={errors.author?.message}
            />
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="tags-label">Tags</InputLabel>
                <Select
                    labelId="tags-label"
                    id="select-tags"
                    disabled={isLoading || isError}
                    {...register("tags")}
                    error={!!errors.tags}
                    multiple
                    value={selectedTags}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-tags" label="Chip" />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                            }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {tags?.map((tag) => (
                        <MenuItem
                            key={tag.slug}
                            value={tag.slug}
                            style={getStyles(tag.name, selectedTags, theme)}
                        >
                            {tag.name}
                        </MenuItem>
                    ))}
                </Select>
                <ErrorMessage errors={errors} field="tags" />
            </FormControl>
            <UploadFile
                image={image}
                onChange={handleImageChange}
                onDelete={() => setImage(null)}
                buttonColor="black"
                fullWidthButton
            />
            <ErrorMessage errors={errors} field="image" />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ p: 1 }}
                size="large"
                loading={isPending}
            >
                {photo ? "Edit Photo" : "Add Photo"}
            </Button>
        </Stack>
    );
};

export default AdminPhotoForm;
