import { IRenderIpc } from '@common/services/ipc';
import { WindowService } from '@common/services/windowService';
import log from 'electron-log';
import Store from 'react-redux';
import FFmpegTool from '@common/tools/ffmpegTool';
import UserLocalStore from '@common/stores/localStore/user/instance';
import DraftLocalStore from '@common/stores/localStore/draft/instance';
import ProjectLocalStore from '@common/stores/localStore/project/instance';

declare global {
  interface Window {
    master: Master;
  }
}

interface Master {
  /**
   * @description 应用存储路径
   */
  appSavePath: string;
  services: MasterServices;
  tools: MasterTools;
  stores: MasterStores;
}

interface MasterServices {
  ipc: IRenderIpc;
  windowService: WindowService;
}

interface MasterTools {
  log: typeof log;
  ffmpegTool: FFmpegTool;
}

interface MasterStores {
  reduxStore: Store;
  localStore: {
    userStoreService: UserLocalStore;
    draftStoreService: DraftLocalStore;
    projectStoreService: ProjectLocalStore;
  };
}
