import { Divider, Drawer, Grid, Toolbar } from "@mui/material";
import styled from "styled-components";

import { ITEMS } from "../../../utils/drawerItem";
import DrawerListCreator from "./DrawerListCreator";

type Props = {
  open: boolean;
};

const LeftDrawer = ({ open }: Props) => {
  return (
    <Drawer
      sx={{
        minHeight: "100%",
        overflow: "hidden",
        "& .MuiDrawer-paper": { borderWidth: 0 },
      }}
      classes={{ paper: "drawerPaper" }}
      anchor="left"
      open={open}
      variant="permanent">
      <Toolbar sx={{ backgroundColor: "blank.main" }}>
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <img src="/favicon.ico" width={24} height={24}></img>
          </Grid>
          <Grid item lg={9}>
            <span style={{ fontSize: 20, fontWeight: 400 }}>react練習</span>
          </Grid>
        </Grid>
      </Toolbar>
      <Divider></Divider>
      <DrawerItem>
        <DrawerListCreator items={ITEMS}></DrawerListCreator>
      </DrawerItem>
    </Drawer>
  );
};

export default LeftDrawer;

const DrawerSizer = styled("div")`
  width: 240px;
`;

const DrawerItem = styled("div")`
  flex-grow: 1;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  overflow: "hidden";
`;
