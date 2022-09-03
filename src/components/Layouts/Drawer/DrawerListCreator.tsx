import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
              <img src={`/src/assets/${key}.svg`} width={16} height={16}></img>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={<span>{key}</span>}></ListItemText>
              {collapser[`${key}`] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={collapser[`${key}`]}>
              {/* Nested List Collapse(ITEM) */}
              <List>
                {items[key].map((value, index) => (
                  <GoToLink
                    to={`${"/" + key + "/" + value}`}
                    key={value + String(index)}>
                    <ListItemButton>
                      <ListItemText
                        secondary={
                          <span>&nbsp;&nbsp;{value}</span>
                        }></ListItemText>
                    </ListItemButton>
                  </GoToLink>
                ))}
              </List>
            </Collapse>
          </List>
        );
      })}
    </>
  );
};

const GoToLink = styled(Link)`
  text-decoration: none;
`;

export default DrawerListCreator;
