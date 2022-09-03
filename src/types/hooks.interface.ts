import { iterable } from "./utils.type";

export interface IiteratorState<T> {
  Iterator: iterable<T>;
  funToStr: string;
}
