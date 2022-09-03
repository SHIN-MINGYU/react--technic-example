import { useState } from "react";

const useIterator = (start: number, end: number) => {
  const [currentFunction, setCurrentFunction] = useState<any>({
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
        const done = i >= end;
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

  return { currentFunction, changeFunction, sourceMap };
};

export default useIterator;
