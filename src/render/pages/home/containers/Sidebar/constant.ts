
export enum SideMenuType {
  DISCOVER = 'DISCOVER',
  LIVE_VIDEO = 'LIVE_VIDEO',
  COMMUNITY = 'COMMUNITY',
}

export const SIDEBAR_MENU_LIST = [
  {
    title: 'Discover',
    className: 'discover',
    type: SideMenuType.DISCOVER,
  },
  {
    title: 'Live Video',
    className: 'video',
    type: SideMenuType.LIVE_VIDEO,
  },
  {
    title: 'Community',
    className: 'community',
    type: SideMenuType.COMMUNITY,
  },
];
