import React, { useState } from 'react';
import './index.less';
import Sidebar from './Sidebar';
import { SideMenuType } from './Sidebar/constant';


function Main() {
  const [sideMenu, setSideMenu] = useState<SideMenuType>(SideMenuType.DISCOVER);

  return (
    <div className="home-container">
      <Sidebar currentSideMenu={sideMenu} onChange={setSideMenu} />
    </div>
  );
}

export default Main;
