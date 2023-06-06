import { RenderIpc } from '@common/services/ipc';
import { Master } from '@typings/browser';
import { Master as MainMaster } from '@typings/node';
import initRenderLog from './log';
const remote = require('@electron/remote');
import FFmpegTool from '@common/tools/ffmpegTool';
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
    const { services } = Master;

    const ipc = new RenderIpc({ processKey });
    const log = initRenderLog();

    const master: Master = {
      services: {
        ipc,
        windowService: services.windowService,
        ffmpegTool: FFmpegTool, 
      },
      tools: {
        log,
      },
    };

    FFmpegTool.init({ devAppPath: remote?.app?.getAppPath(), buildAppPath: '' });
    resolve(master);
  });
}

export default initMaster;
