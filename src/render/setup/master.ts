import initReduxStore, { AppState } from './reduxStore';
import { RenderIpc } from '@common/services/ipc';
import { Master } from '@typings/browser';
const remote = require('@electron/remote');

export interface InitMasterOptions {
  /**
   * 渲染进程的唯一标识，用于初始化渲染进程的窗口通信服务 ipc
   */
  processKey: string;
}

export async function initMaster(options: InitMasterOptions): Promise<Master> {
  return new Promise((resolve) => {
    const { processKey } = options;
    const Master = remote.getGlobal('master');

    const state: AppState = Master.store.reduxStore.getState();

    const reduxStore = initReduxStore(state);
    const ipc = new RenderIpc({ processKey });

    const master: Master = {
      service: {
        ipc,
      },
      store: {
        reduxStore,
      },
    };

    resolve(master);
  });
}

export default initMaster;
