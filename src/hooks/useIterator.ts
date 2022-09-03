import { useState } from "react";

import { IiteratorState } from "../types/hooks.interface";

/**
 * @hooks
 * @param start : number start value of number
 * @param end : number end value of number
 * @description this hook provide way to render ijust number iterator in window
 */
const useIterator = (start: number, end: number) => {
  const [currentFunction, setCurrentFunction] = useState<
    IiteratorState<number>
  >({
    Iterator: generator(),
    funToStr: generator.toString(),
  });

  const sourceMap = ["generator", "normalIterator"];

  function* generator() {
    let i = start;
    while (i <= end) yield i++;
  }

  function normalIterator() {
    let i = start;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        const done = i > end;
        return {
          done: done,
          value: !done ? i++ : undefined,
        };
      },
    };
  }
  const changeFunction = (funcName: string) => {
    if (funcName === "generator") {
      setCurrentFunction(() => {
        return {
          Iterator: generator(),
          funToStr: generator.toString(),
        };
      });
    } else {
      setCurrentFunction(() => {
        return {
          Iterator: normalIterator(),
          funToStr: normalIterator.toString(),
        };
      });
    }
  };

  return {
    currentFunction,
    changeFunction,
    sourceMap,
  };
};

export default useIterator;
