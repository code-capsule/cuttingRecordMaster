import { IMainIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';
import log from 'electron-log';
import Store from 'react-redux';
import UserStoreService from '@common/services/userStoreService/instance';

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
}

interface MasterTools {
  log: typeof log;
}

interface MasterStores {
  reduxStore: Store;
}
