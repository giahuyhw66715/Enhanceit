declare module "@mui/material/styles" {
    interface Palette {
        gray: Palette["primary"];
        black: Palette["primary"];
    }

    interface PaletteOptions {
        gray?: PaletteOptions["primary"];
        black?: PaletteOptions["primary"];
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        black: true;
        gray: true;
    }
}

declare module "@mui/material/Chip" {
    interface ChipPropsColorOverrides {
        black: true;
        gray: true;
    }
}

declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        black: true;
        gray: true;
    }
}
