export enum SideMenuType {
  HOME = 'HOME',
  RECYCLE = 'RECYCLE',
  COMMUNITY = 'COMMUNITY',
}

export const SIDEBAR_MENU_LIST = [
  {
    title: '首页',
    className: 'home',
    type: SideMenuType.HOME,
  },
  {
    title: '回收站',
    className: 'recycle',
    type: SideMenuType.RECYCLE,
  },
  {
    title: '掘金社区',
    className: 'community',
    type: SideMenuType.COMMUNITY,
  },
];
