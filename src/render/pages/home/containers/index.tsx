import React, { useState } from 'react';
import './index.less';
import User from './User';
import Sidebar from './Sidebar';
import TopMenu from '@common/components/TopMenu';
import Scrollbar from '@common/components/ScrollBar';
import { SideMenuType } from './Sidebar/constant';
import { HOME_PROCESS_KEY } from '@common/constants/processKey';
import CuttingRecordingBox from './CuttingRecordingBox';

function Main() {
  const [sideMenu, setSideMenu] = useState<SideMenuType>(SideMenuType.DISCOVER);

  return (
    <div className="home-container">
      <div className="home-drag-box" />
      <div className="home-top-menu">
        <TopMenu currentWindow={HOME_PROCESS_KEY} svgColor="#808191" />
      </div>
      <div className="home-left">
        <Sidebar currentSideMenu={sideMenu} onChange={setSideMenu} />
        <User />
      </div>
      <div className="home-right">
        <Scrollbar maxHeight={window.innerHeight - 32} x={{ show: false }} y={{ show: false }}>
          <CuttingRecordingBox />
        </Scrollbar>
      </div>
    </div>
  );
}

export default Main;
