
export enum SideMenuType {
  HOME = 'HOME',
  COMMUNITY = 'COMMUNITY',
}

export const SIDEBAR_MENU_LIST = [
  {
    title: 'Home',
    className: 'home',
    type: SideMenuType.HOME,
  },
  {
    title: 'Community',
    className: 'community',
    type: SideMenuType.COMMUNITY,
  },
];
