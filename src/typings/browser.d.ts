import { IRenderIpc } from '@common/services/ipc';
import { WindowService } from '@common/services/windowService';
import log from 'electron-log';
import Store from 'react-redux';
import FFmpegTool from '@common/tools/ffmpegTool';
import { IRecordService } from '@common/services/recordService/typings';
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
   * @description 应用数据存档路径
   */
  appArchivePath: string;
  services: MasterServices;
  tools: MasterTools;
  stores: MasterStores;
}

interface MasterServices {
  ipc: IRenderIpc;
  windowService: WindowService;
  recordService: IRecordService;
}

interface MasterTools {
  log: typeof log;
  ffmpegTool: FFmpegTool;
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
