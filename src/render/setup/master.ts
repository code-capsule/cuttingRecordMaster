import { RenderIpc } from '@common/services/ipc';
import { Master } from '@typings/browser';
import { Master as MainMaster } from '@typings/node';
const remote = require('@electron/remote');

export interface InitRenderMasterOptions {
  /**
   * 渲染进程的唯一标识，用于初始化渲染进程的窗口通信服务 ipc
   */
  processKey: string;
}

export async function initMaster(
  options: InitRenderMasterOptions
): Promise<Master> {
  return new Promise((resolve) => {
    const { processKey } = options;

    const Master: MainMaster = remote.getGlobal('master');
    const { service } = Master;

    const ipc = new RenderIpc({ processKey });

    const master: Master = {
      service: {
        ipc,
        windowService: service.windowService,
      },
    };

    resolve(master);
  });
}

export default initMaster;
