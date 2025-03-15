import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#6C5CE7",
        },
        secondary: {
            main: "#df6589",
        },
        background: {
            default: "#FAFAFA",
        },
        text: {
            primary: "#000000",
            secondary: "#707177",
        },
        gray: {
            main: "#f1f3f6",
            light: "#26377a0f",
            dark: "#e5e7ec",
            contrastText: "#000000",
        },
        black: {
            main: "#000000",
            light: "#404147",
            contrastText: "#ffffff",
        },
    },
    typography: {
        fontFamily: "Poppins, serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 10,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: "none",
                color: "textPrimary",
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                },
            },
        },
    },
});
