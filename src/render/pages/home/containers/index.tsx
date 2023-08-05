import React, { useEffect, useState } from 'react';
import './index.less';
import User from './User';
import Sidebar from './Sidebar';
import TopMenu from '@common/components/TopMenu';
import Scrollbar from '@common/components/ScrollBar';
import { SideMenuType } from './Sidebar/constant';
import { HOME_PROCESS_KEY } from '@common/constants/processKey';
import CuttingRecordingBox from './CuttingRecordingBox';
import ProductCard from './ProductCard';

const DRAFT_LIST: MasterDraftType.IDraftItem[] = [
  {
    id: '111',
    projectName: 'Basic how to ride your skateboard comfortly',
    firstVideoPool:
      'https://player.vimeo.com/external/436572488.sd.mp4?s=eae5fb490e214deb9ff532dd98d101efe94e7a8b&profile_id=139&oauth2_token_id=57447761',
    duration: 351,
    createTime: 1687943237882,
    updateTime: 1687943237882,
  },
  {
    id: '222',
    projectName: 'Prepare for your first skateboard jump',
    firstVideoPool:
      'https://player.vimeo.com/external/449972745.sd.mp4?s=9943177fe8a6147b7bc4598259401f06ec57878a&profile_id=139&oauth2_token_id=57447761',
    duration: 351,
    createTime: 1687943237882,
    updateTime: 1687943237882,
  },
  {
    id: '333',
    projectName: 'Basic equipment to play skateboard safely',
    firstVideoPool:
      'https://player.vimeo.com/external/436553499.sd.mp4?s=0e44527f269278743db448761e35c5e39cfaa52c&profile_id=139&oauth2_token_id=57447761',
    duration: 351,
    createTime: 1687943237882,
    updateTime: 1687943237882,
  },
  {
    id: '444',
    projectName: 'Tips to playing skateboard on the ramp',
    firstVideoPool:
      'https://player.vimeo.com/external/361861493.sd.mp4?s=19d8275ca755d653042a87ef28b2f0b2eabf57d0&profile_id=139&oauth2_token_id=57447761',
    duration: 351,
    createTime: 1687943237882,
    updateTime: 1687943237882,
  },
];

function Main() {
  const [sideMenu, setSideMenu] = useState<SideMenuType>(SideMenuType.HOME);

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
          <div className="home-product-title">Recent Draft Product </div>
          <div className="home-product-list">
            {DRAFT_LIST?.map((draftInfo: MasterDraftType.IDraftItem, idx) => {
              return (
                <React.Fragment key={`${draftInfo?.id}_${idx}`}>
                  <ProductCard data={draftInfo} />
                </React.Fragment>
              );
            })}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}

export default Main;
