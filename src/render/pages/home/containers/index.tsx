import React, { useState } from 'react';
import './index.less';
import User from './User';
import Sidebar from './Sidebar';
import { SideMenuType } from './Sidebar/constant';


function Main() {
  const [sideMenu, setSideMenu] = useState<SideMenuType>(SideMenuType.DISCOVER);

  return (
    <div className="home-container">
      <div className='home-left'>
        <Sidebar currentSideMenu={sideMenu} onChange={setSideMenu} />
        <User />
      </div>
    </div>
  );
}

export default Main;
