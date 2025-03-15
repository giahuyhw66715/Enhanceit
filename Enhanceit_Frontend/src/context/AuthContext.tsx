import { createContext } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    UseMutationResult,
} from "@tanstack/react-query";
import { fetchMe, login, logout, register } from "../lib/actions/auth";
import {
    ErrorResponse,
    InferLogin,
    InferRegister,
    Token,
    User,
} from "../lib/types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: User | null;
    loginMutation: UseMutationResult<Token, ErrorResponse, InferLogin, unknown>;
    registerMutation: UseMutationResult<
        Token,
        ErrorResponse,
        InferRegister,
        unknown
    >;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: fetchMe,
        enabled: !!localStorage.getItem("accessToken"), // Chỉ fetch nếu có token
        retry: false, // Không retry nếu lỗi
    });

    const loginMutation = useMutation<Token, ErrorResponse, InferLogin>({
        mutationFn: async (user: InferLogin) => await login(user),
        onSuccess: () => {
            refetch(); // Sau khi login thì fetch lại user
            toast.success("Login successfully");
            navigate("/");
        },
        onError: (error: ErrorResponse) => {
            return toast.error(error.response.data.detail);
        },
    });

    const registerMutation = useMutation<Token, ErrorResponse, InferRegister>({
        mutationFn: async (user: InferRegister) => await register(user),
        onSuccess: () => {
            refetch(); // Sau khi login thì fetch lại user
            toast.success("Register successfully");
            navigate("/");
        },
        onError: (error: ErrorResponse) => {
            return toast.error(error.response.data.detail);
        },
    });

    const handleLogout = () => {
        logout();
        queryClient.setQueryData(["user"], null); // Xóa cache user
    };

    return (
        <AuthContext.Provider
            value={{ user, loginMutation, registerMutation, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
