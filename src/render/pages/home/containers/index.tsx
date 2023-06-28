import React, { useState } from 'react';
import './index.less';
import User from './User';
import Sidebar from './Sidebar';
import { SideMenuType } from './Sidebar/constant';
import { HOME_PROCESS_KEY } from '@common/constants/processKey';
import TopMenu from '@common/components/TopMenu';


function Main() {
  const [sideMenu, setSideMenu] = useState<SideMenuType>(SideMenuType.DISCOVER);

  return (
    <div className="home-container">
    <div className="home-drag-box" />
      <div className="home-top-menu">
        <TopMenu currentWindow={HOME_PROCESS_KEY} svgColor="#808191" />
      </div>
      <div className='home-left'>
        <Sidebar currentSideMenu={sideMenu} onChange={setSideMenu} />
        <User />
      </div>
    </div>
  );
}

export default Main;
