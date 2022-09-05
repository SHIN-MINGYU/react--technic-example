import Actions from "./Actions";
import Code from "./Code";

import type { IProps } from "../../../types/utils.interface";
interface Props extends IProps {}

/**
 *
 * @param children
 * @child - CodeContainer.Actions
 * @child - CodeContainer.Code
 */
const CodeContainer = ({ children }: Props) => {
  return <>{children}</>;
};

/**
 * @param sourseMap - string
 * the code's string arr
 *
 * @param action -  (funcName: string) => void;
 *
 * the action of button created by sourseMap
 */
CodeContainer.Actions = Actions;

/**
 * @param code - string
 * the code
 */
CodeContainer.Code = Code;

export default CodeContainer;
