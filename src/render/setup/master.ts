import { RenderIpc } from '@common/services/ipc';
import { Master } from '@typings/browser';
import { Master as MainMaster } from '@typings/node';
import initRenderLog from './log';
const remote = require('@electron/remote');
import initReduxStore from '@common/stores/reduxStore';
import FFmpegTool from '@common/tools/ffmpegTool';
import path from 'path';

export interface InitRenderMasterOptions {
  /**
   * 渲染进程的唯一标识，用于初始化渲染进程的窗口通信服务 ipc
   */
  processKey: string;
}

export async function initMaster(options: InitRenderMasterOptions): Promise<Master> {
  return new Promise((resolve) => {
    const { processKey } = options;

    const Master: MainMaster = remote.getGlobal('master');
    const { services, stores, appSavePath } = Master;

    const ipc = new RenderIpc({ processKey });
    const log = initRenderLog();

    const state: MasterAppStoreType.AppState = stores.reduxStore.getState();

    const reduxStore = initReduxStore(state, 'render');

    const appRootPath = path.join(remote?.app.getAppPath(), '../');
    const master: Master = {
      appSavePath,
      appRootPath,
      services: {
        ipc,
        windowService: services.windowService,
        userStoreService: services.userStoreService,
        draftStoreService: services.draftStoreService,
        projectStoreService: services.projectStoreService,
      },
      tools: {
        log,
        ffmpegTool: new FFmpegTool(),
      },
      stores: {
        reduxStore,
      },
    };

    FFmpegTool.init({ devAppPath: remote?.app?.getAppPath(), buildAppPath: '' });
    resolve(master);
  });
}

export default initMaster;
