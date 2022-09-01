import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";

import useDrawerOpener from "../../../hooks/useDrawerOpener";
import { DrawerItem } from "../../../utils/drawerItem";

type Props = {
  items: DrawerItem;
};

/**
 * @param {DrawerItem} items
 *
 * @returns JSX.Elements
 */
const DrawerListCreator = ({ items }: Props) => {
  const { collapser, collapserHandler } = useDrawerOpener(items);

  return (
    <>
      {Object.keys(items).map((key, index) => {
        return (
          <List key={key + String(index)}>
            {/* Nested List Header */}
            <ListItemButton
              sx={{ fontFamily: "KTEGAKI" }}
              onClick={() => collapserHandler(key)}
              component={"div"}>
              <ListItemText primary={<span>{key}</span>}></ListItemText>
              {collapser[`${key}`] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapser[`${key}`]}>
              {/* Nested List Collapse(ITEM) */}
              <List>
                {items[key].map((value, index) => (
                  <ListItemButton key={value + String(index)}>
                    <ListItemText
                      secondary={
                        <span>&nbsp;&nbsp;{value}</span>
                      }></ListItemText>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        );
      })}
    </>
  );
};

export default DrawerListCreator;
