import Actions from "./Actions";
import Code from "./Code";

import type { IProps } from "../../../types/utils.interface";
interface Props extends IProps {}

const CodeContainer = ({ children }: Props) => {
  return <>{children}</>;
};

CodeContainer.Actions = Actions;

CodeContainer.Code = Code;

export default CodeContainer;
