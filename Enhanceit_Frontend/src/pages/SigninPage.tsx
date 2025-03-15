import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Heading from "../components/common/Heading";
import TextFieldPassword from "../components/common/TextFieldPassword";
import { LoginOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { loginSchema } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";
import { InferLogin } from "../lib/types";
import { Link } from "react-router-dom";

const SigninPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InferLogin>({
        resolver: zodResolver(loginSchema),
    });

    const { loginMutation } = useAuth();
    const { mutate, isPending } = loginMutation;

    return (
        <Box>
            <Heading title="Sign In" />
            <Stack
                component="form"
                spacing={2}
                sx={{ mt: 5 }}
                onSubmit={handleSubmit((data) => mutate(data))}
            >
                <TextField
                    label="Email address"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextFieldPassword
                    label="Password"
                    errors={errors}
                    field="password"
                    {...register("password")}
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
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/register">Sign Up</Link>
                </Typography>
            </Stack>
        </Box>
    );
};

export default SigninPage;
