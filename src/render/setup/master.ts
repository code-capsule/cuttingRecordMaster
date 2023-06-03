import { RenderIpc } from '@common/services/ipc';
import { Master } from '@typings/browser';

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

    const ipc = new RenderIpc({ processKey });

    const master: Master = {
      service: {
        ipc,
      },
    };

    resolve(master);
  });
}

export default initMaster;
