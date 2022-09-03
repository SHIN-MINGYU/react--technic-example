import { ThemeProvider } from "@mui/material";
import { useState } from "react";

import LeftDrawer from "./Drawer";
import Header from "./Header";
import Main from "./Main";
import { theme } from "./theme";

import type { IProps } from "../../types/utils.interface";
const drawerWidth = 240;

interface Props extends IProps {}

const Layout = ({ children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const drawerHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header drawerHandler={drawerHandler}></Header>
      <LeftDrawer open={open} drawerWidth={drawerWidth}></LeftDrawer>
      <Main drawerWidth={drawerWidth}>{children}</Main>
    </ThemeProvider>
  );
};

export default Layout;
