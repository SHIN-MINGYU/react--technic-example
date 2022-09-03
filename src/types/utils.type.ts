export type iterable<T> =
  | Generator<T, void, unknown>
  | {
      [Symbol.iterator](): any;
      next(): {
        done: boolean;
        value: T | undefined;
      };
    };
