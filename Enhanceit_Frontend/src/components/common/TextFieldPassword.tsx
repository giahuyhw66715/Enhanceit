import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { FieldErrors, FieldValues } from "react-hook-form";

const TextFieldPassword = ({
    label,
    errors,
    field,
    ...props
}: {
    label: string;
    errors: FieldErrors<FieldValues>;
    field: string;
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    return (
        <FormControl variant="outlined">
            <InputLabel
                htmlFor={field}
                color={errors[field] ? "error" : "primary"}
            >
                {label}
            </InputLabel>
            <OutlinedInput
                type={showPassword ? "text" : "password"}
                error={!!errors[field]}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword
                                    ? "hide the password"
                                    : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                {...props}
            />
            <ErrorMessage errors={errors} field={field} />
        </FormControl>
    );
};

export default TextFieldPassword;
