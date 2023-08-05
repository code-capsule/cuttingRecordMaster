
export enum SideMenuType {
  HOME = 'HOME',
  RECYCLE = 'RECYCLE',
  COMMUNITY = 'COMMUNITY',
}

export const SIDEBAR_MENU_LIST = [
  {
    title: 'Home',
    className: 'home',
    type: SideMenuType.HOME,
  },
  {
    title: 'Recycle',
    className: 'recycle',
    type: SideMenuType.RECYCLE,
  },
  {
    title: 'Community',
    className: 'community',
    type: SideMenuType.COMMUNITY,
  },
];
