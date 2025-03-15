import { useMediaQuery } from "@mui/material";
import { theme } from "../theme";

export default function useMedia() {
    return {
        isMobile: useMediaQuery(theme.breakpoints.down("sm")),
        isTablet: useMediaQuery(theme.breakpoints.down("md")),
        isDesktop: useMediaQuery(theme.breakpoints.up("md")),
    };
}
