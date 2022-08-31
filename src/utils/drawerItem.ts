/**
 *  @const
 *  @type {string}
 *  @default
 */

type DrawerKey = "javascript";

/**
 * @content DrawerNavigationのリストに表すアイテムのタイプ
 */

export type DrawerItem = {
  [key in DrawerKey]: Array<string>;
};

export const ITEMS: DrawerItem = {
  javascript: [],
};
