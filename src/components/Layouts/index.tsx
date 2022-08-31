import { ThemeProvider } from "@mui/material";

import { useState } from "react";
import { theme } from "./theme";
import Header from "./Header";
import LeftDrawer from "./Drawer";

const Layout = () => {
  const [open, setOpen] = useState<boolean>(false);

  const drawerHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header drawerHandler={drawerHandler}></Header>
      <LeftDrawer open={open}></LeftDrawer>
    </ThemeProvider>
  );
};

export default Layout;
