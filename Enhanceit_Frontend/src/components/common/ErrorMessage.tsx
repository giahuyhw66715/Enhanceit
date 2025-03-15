import { Typography } from "@mui/material";
import { FieldErrors, FieldValues } from "react-hook-form";

const ErrorMessage = <T extends FieldValues>({
    errors,
    field,
}: {
    errors: FieldErrors<T>;
    field: string;
}) => {
    return (
        <>
            {errors[field] && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: "3px", mx: "14px" }}
                >
                    {errors[field]?.message?.toString() ??
                        "Something went wrong"}
                </Typography>
            )}
        </>
    );
};

export default ErrorMessage;
