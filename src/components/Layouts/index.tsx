import { ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

import LeftDrawer from "./Drawer";
import Header from "./Header";
import Main from "./Main";
import { theme } from "./theme";

const Layout = () => {
  const [open, setOpen] = useState<boolean>(false);

  const drawerHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <Header drawerHandler={drawerHandler}></Header>
        <LeftDrawer open={open}></LeftDrawer>
        <Container></Container>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
