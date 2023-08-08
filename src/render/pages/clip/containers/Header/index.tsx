import React from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import Name from './Name';
import TopMenu from '@common/components/TopMenu';
import { CLIP_PROCESS_KEY } from '@common/constants/processKey';
import DefaultProjectCoverPNG from '@common/svgs/default_project_cover.png';

const Header = () => {
  const projectCover = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.cover, shallowEqual);

  return (
    <div className="clip-header-container">
      <div className="clip-left-area">
        <img src={projectCover || DefaultProjectCoverPNG} className="clip-project-cover" alt="" />
        <Name />
        <p className="clip-auto-save-time">17:08:32 自动保存到本地</p>
      </div>
      <div className="clip-right-area">
        <TopMenu currentWindow={CLIP_PROCESS_KEY} svgColor="#808191" />
      </div>
    </div>
  );
};

export default Header;
