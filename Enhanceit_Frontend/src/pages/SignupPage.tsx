import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Heading from "../components/common/Heading";
import TextFieldPassword from "../components/common/TextFieldPassword";
import { LoginOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";
import { InferRegister } from "../lib/types";
import { registerSchema } from "../lib/schema";
import { Link } from "react-router-dom";

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InferRegister>({
        resolver: zodResolver(registerSchema),
    });

    const { registerMutation } = useAuth();
    const { mutate, isPending } = registerMutation;

    return (
        <Box>
            <Heading title="Sign Up" />
            <Stack
                component="form"
                spacing={2}
                sx={{ mt: 5 }}
                onSubmit={handleSubmit((data) => mutate(data))}
            >
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Email address"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{ flex: 1 }}
                    />
                    <TextField
                        label="Full name"
                        {...register("fullname")}
                        error={!!errors.fullname}
                        helperText={errors.fullname?.message}
                        sx={{ flex: 1 }}
                    />
                </Stack>
                <TextFieldPassword
                    label="Password"
                    errors={errors}
                    field="password"
                    {...register("password")}
                />
                <TextFieldPassword
                    label="Confirm password"
                    errors={errors}
                    field="confirmPassword"
                    {...register("confirmPassword")}
                />
                <Button
                    variant="contained"
                    startIcon={<LoginOutlined />}
                    size="large"
                    type="submit"
                    sx={{ p: 2 }}
                    loading={isPending}
                >
                    Login
                </Button>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Already have an account?{" "}
                    <Link to="/auth/login">Sign In</Link>
                </Typography>
            </Stack>
        </Box>
    );
};

export default SignupPage;
