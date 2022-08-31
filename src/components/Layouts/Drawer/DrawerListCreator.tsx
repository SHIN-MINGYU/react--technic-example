import { List, ListSubheader } from "@mui/material";
import { DrawerItem, ITEMS } from "../../../utils/drawerItem";

type Props = {
  items: DrawerItem;
};
/**
 * @param {DrawerItem} {items}
 *
 * @returns JSX.Elements
 */
const DrawerListCreator = ({ items }: Props) => {
  return (
    <>
      {Object.keys(items).map((key, index) => {
        return (
          <List
            subheader={
              <ListSubheader sx={{ fontFamily: "KTEGAKI" }} component={"div"}>
                <span>{key}</span>
              </ListSubheader>
            }></List>
        );
      })}
    </>
  );
};

export default DrawerListCreator;
