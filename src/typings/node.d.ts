import { IMainIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';
import log from 'electron-log';
import Store from 'react-redux';
import UserStoreService from '@common/services/userStoreService/instance';
import DraftStoreService from '@common/services/draftStoreService/instance';
import ProjectStoreService from '@common/services/projectStoreService/instance';

declare global {
  var master: Master;
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
  ipc: IMainIpc;
  windowService: WindowService;
  userStoreService: UserStoreService;
  draftStoreService: DraftStoreService;
  projectStoreService: ProjectStoreService;
}

interface MasterTools {
  log: typeof log;
}

interface MasterStores {
  reduxStore: Store;
}
