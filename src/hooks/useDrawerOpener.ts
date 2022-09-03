import { useCallback, useEffect, useState } from "react";

import { IStringToBool } from "../types/signature.interface";
import { DrawerItem } from "../utils/drawerItem";

/**
 * @description Drawerのcollaseを管理する関数
 */
const useDrawerOpener = (items: DrawerItem) => {
  const [collapser, setCollapser] = useState<IStringToBool>({});

  const init = useCallback(() => {
    setCollapser((prev) => {
      let itemKeys: IStringToBool = {};

      Object.keys(items).forEach((el) => {
        itemKeys[`${el}`] = true;
      });

      // Objectが変わったことをReactに教えるために基のprev変数ではなく
      // 空Objectに入れてあげて新しいアドレスの値を持ったObjectを返す
      return Object.assign({}, prev, itemKeys);
    });
  }, []);

  /**
   * @param key Nested List Headerのテキスト
   * @content クリックしたNested ListのCollapse状態を変える関数
   */
  const collapserHandler = (key: string) => {
    setCollapser((prev) => {
      const newObj: IStringToBool = {};
      newObj[key] = !prev[key];
      return Object.assign({}, prev, newObj);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return { collapser, collapserHandler };
};

export default useDrawerOpener;
