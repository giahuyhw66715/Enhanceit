import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.tsx";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </QueryClientProvider>
            <Toaster position="bottom-center" reverseOrder={false} />
        </ThemeProvider>
    </BrowserRouter>
);
