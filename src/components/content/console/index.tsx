import { CardContent } from "@mui/material";
import styled from "styled-components";

import Typing from "./Typing";

import type { IProps } from "../../../types/utils.interface";
interface Props extends IProps {}

/**
 *
 * @param children - Components
 * @child - Console.Typing<T>
 */
const Console = ({ children }: Props) => {
  return <ConsoleWindow>{children}</ConsoleWindow>;
};
/**
 * @param iterator Iterator
 * the Iterator for  render in window
 */
Console.Typing = Typing;

const ConsoleWindow = styled(CardContent)`
  margin: 10px;
  height: 400px;
  overflow-y: auto;
  background-color: white;
`;

export default Console;
