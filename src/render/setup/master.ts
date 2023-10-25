import { RenderIpc } from '@common/services/ipc';
import { Master } from '@typings/browser';
import { Master as MainMaster } from '@typings/node';
import initRenderLog from './log';
const remote = require('@electron/remote');
import initReduxStore from '@common/stores/reduxStore';
import FFmpegTool from '@common/tools/ffmpegTool';
import path from 'path';
import RecorderService from '@src/common/services/recordService';

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
    const { services, stores, appArchivePath } = Master;

    const ipc = new RenderIpc({ processKey });
    const log = initRenderLog();

    const state: MasterAppStoreType.AppState = stores.reduxStore.getState();

    const reduxStore = initReduxStore(state, 'render');

    const appRootPath = path.join(remote?.app.getAppPath(), '../');
    const recordService = new RecorderService();

    const master: Master = {
      appRootPath,
      appArchivePath,
      services: {
        ipc,
        windowService: services.windowService,
        recordService,
      },
      tools: {
        log,
        ffmpegTool: FFmpegTool,
      },
      stores: {
        reduxStore,
        localStore: {
          user: stores?.localStore?.user,
          draft: stores?.localStore?.draft,
          project: stores?.localStore?.project,
        },
      },
    };

    FFmpegTool.config({ devPath: remote?.app?.getAppPath(), buildPath: '', master });
    recordService.initialize({ recordEvent: ipc });
    resolve(master);
  });
}

export default initMaster;
