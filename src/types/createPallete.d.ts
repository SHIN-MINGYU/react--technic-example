import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    /**
     * @param light?: string;
     * @param main: string;
     * @param dark?: string;
     * @param contrastText?: string;
     */
    blank?: PaletteColorOptions;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    blank: true;
  }
}

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    blank: true;
  }
}
