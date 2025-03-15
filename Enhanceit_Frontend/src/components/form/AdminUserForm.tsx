import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
    ErrorResponse,
    InferEditUser,
    InferUser,
    Role,
    SubscriptionPlan,
    User,
} from "../../lib/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import TextFieldPassword from "../common/TextFieldPassword";
import { editUserSchema, userSchema } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addUser, editUser } from "../../lib/actions/users";

const AdminUserForm = ({ user }: { user?: User }) => {
    const [role, setRole] = useState<string>(user?.role || Role.USER);
    const [plan, setPlan] = useState<string>(
        user?.subscription_plan || SubscriptionPlan.FREE
    );
    const allRoles = Object.values(Role);
    const allPlans = Object.values(SubscriptionPlan);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InferUser | InferEditUser>({
        resolver: zodResolver(user ? editUserSchema : userSchema),
        defaultValues: {
            fullname: user?.fullname || "",
            email: user?.email || "",
            password: "",
            confirmPassword: "",
            role: user?.role || Role.USER,
            subscription_plan: user?.subscription_plan || SubscriptionPlan.FREE,
            subscription_expires:
                user?.subscription_expires?.substring(0, 10) || "",
            credits: user?.credits || 5,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: InferUser | InferEditUser) => {
            return user
                ? editUser(user.id, data as InferEditUser)
                : addUser(data as InferUser);
        },
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
            setRole(Role.USER);
            setPlan(SubscriptionPlan.FREE);
        },
        onError: (error: ErrorResponse) => {
            toast.error(error.response.data.detail);
        },
    });

    return (
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
            <Stack direction="row" spacing={2}>
                {user?.role === Role.ADMIN && (
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            {...register("role")}
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            {allRoles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <FormControl fullWidth>
                    <InputLabel id="plan-label">Plan</InputLabel>
                    <Select
                        labelId="plan-label"
                        {...register("subscription_plan")}
                        value={plan}
                        label="Plan"
                        disabled={user?.role === Role.USER}
                        onChange={(e) => setPlan(e.target.value)}
                    >
                        {allPlans.map((plan) => (
                            <MenuItem key={plan} value={plan}>
                                {plan}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Subscription expires"
                    {...register("subscription_expires")}
                    error={!!errors.subscription_expires}
                    helperText={errors.subscription_expires?.message}
                    disabled={user?.role === Role.USER}
                    sx={{ flex: 1 }}
                />
                <TextField
                    label="Credits"
                    type="number"
                    {...register("credits", { valueAsNumber: true })}
                    error={!!errors.credits}
                    helperText={errors.credits?.message}
                    disabled={user?.role === Role.USER}
                    sx={{ flex: 1 }}
                />
            </Stack>
            <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{ p: 2 }}
                loading={isPending}
            >
                {user ? "Update" : "Create"} User
            </Button>
        </Stack>
    );
};

export default AdminUserForm;
