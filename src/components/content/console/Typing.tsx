import styled from "styled-components";

import type { IProps } from "../../../types/utils.interface";
import type { iterable } from "../../../types/utils.type";
interface TypingProps<T> extends IProps {
  iterator: iterable<T> | Array<T>;
}

function Typing<T>({ iterator }: TypingProps<T>) {
  let arr: Array<T> = Array.isArray(iterator) ? iterator : Array.from(iterator);
  return (
    <>
      {arr.map((el, idx) => {
        return (
          <ConsoleTyping key={idx}>
            <>console &gt;&gt;{el}</>
          </ConsoleTyping>
        );
      })}
    </>
  );
}
const ConsoleTyping = styled.p`
  color: black;
`;

export default Typing;
