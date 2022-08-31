import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Dispatch, SetStateAction } from "react";

type Props = {
  drawerHandler: () => void;
};

const Header = ({ drawerHandler }: Props) => {
  return (
    <AppBar
      sx={{
        borderBottom: "1px solid rgba(0,0,0,0.12)",
      }}
      elevation={0}
      color="blank">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={drawerHandler}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
