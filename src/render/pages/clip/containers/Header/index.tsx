import React from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import Name from './Name';
import TopMenu from '@common/components/TopMenu';
import DefaultProjectCoverPNG from '@common/svgs/default_project_cover.png';
import { DRAFT_STORE_IPC_KEY } from '@src/common/constants/ipcEventKey';
import { HOME_PROCESS_KEY, CLIP_PROCESS_KEY } from '@common/constants/processKey';

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
        <TopMenu
          svgColor="#808191"
          currentWindow={CLIP_PROCESS_KEY}
          onClose={async () => {
            // 1.关闭当前窗口，显示首页窗口
            const homeWindowInstance = window.master?.services?.windowService?.get(HOME_PROCESS_KEY);
            const clipWindowInstance = window.master?.services?.windowService?.get(CLIP_PROCESS_KEY);
            clipWindowInstance?.hide();
            // 2.发送时间告知首页进行草稿列表刷新
            window.master.services?.ipc?.request(DRAFT_STORE_IPC_KEY.GET_LIST, 'infinite').finally(() => {
              homeWindowInstance?.show();
              clipWindowInstance?.close();
            });
          }}
        />
      </div>
    </div>
  );
};

export default Header;
