import React from 'react';
import './index.less';
import { SideMenuType, SIDEBAR_MENU_LIST } from './constant';
import { ReactComponent as IcCommonHomeSvg } from '@common/svgs/ic_common_home.svg';
import { ReactComponent as IcCommonCommunitySvg } from '@common/svgs/ic_common_community.svg';

interface IProps {
  currentSideMenu: SideMenuType;
  onChange?: (sidebar: SideMenuType) => void;
}

const Sidebar = (props: IProps) => {
  return (
    <div className="home-sidebar">
      <div className="home-title">Dashboard</div>
      <div className="side-wrapper">
        <div className="side-title">MENU</div>
        {SIDEBAR_MENU_LIST.map((sidebar, idx: number) => {
          return (
            <div
              key={`${sidebar.type}_${idx}`}
              onClick={() => props?.onChange?.(sidebar?.type)}
              className={`side-menu ${sidebar?.className} ${props?.currentSideMenu === sidebar?.type ? 'active' : ''}`}
            >
              <div className="side-svg-box">
                {sidebar?.type === SideMenuType.HOME && <IcCommonHomeSvg className="svg" />}
                {sidebar?.type === SideMenuType.COMMUNITY && <IcCommonCommunitySvg className="svg" />}
              </div>
              <div className="side-svg-label">{sidebar?.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
