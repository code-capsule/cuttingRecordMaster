import { IMainIpc } from '@common/services/ipc';
import { WindowService } from '@common/services/windowService';
import log from 'electron-log';
import Store from 'react-redux';
import UserLocalStore from '@common/stores/localStore/user/instance';
import DraftLocalStore from '@common/stores/localStore/draft/instance';
import ProjectLocalStore from '@common/stores/localStore/project/instance';

declare global {
  var master: Master;
}

interface Master {
  /**
   * @description 应用在本机中的根路径
   */
  appRootPath?: string;
  /**
   * @description 应用数据存档路径
   */
  appArchivePath: string;
  services: MasterServices;
  tools: MasterTools;
  stores: MasterStores;
}

interface MasterServices {
  ipc: IMainIpc;
  windowService: WindowService;
}

interface MasterTools {
  log: typeof log;
}

interface MasterStores {
  reduxStore: Store;
  localStore: MasterLocalStoreType;
}

interface MasterLocalStoreType {
  user: UserLocalStore;
  draft: DraftLocalStore;
  project: ProjectLocalStore;
}
