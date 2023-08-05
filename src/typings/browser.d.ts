import { IRenderIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';
import log from 'electron-log';
import Store from 'react-redux';
import FFmpegTool from '@common/tools/ffmpegTool';
import UserStoreService from '@common/services/userStoreService/instance';
import DraftStoreService from '@common/services/draftStoreService/instance';
import ProjectStoreService from '@common/services/projectStoreService/instance';

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
  userStoreService: UserStoreService;
  draftStoreService: DraftStoreService;
  projectStoreService: ProjectStoreService;
}

interface MasterTools {
  log: typeof log;
  ffmpegTool: FFmpegTool;
}

interface MasterStores {
  reduxStore: Store;
}
