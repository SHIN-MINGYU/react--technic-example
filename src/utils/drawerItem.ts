/**
 * @content DrawerNavigationのリストに表すアイテムのタイプ
 */

export type DrawerItem = {
  [key: string]: Array<string>;
};

export const ITEMS: DrawerItem = {
  javascript: ["generator"],
};
