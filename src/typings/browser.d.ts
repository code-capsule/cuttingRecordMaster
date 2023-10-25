import { IRenderIpc } from '@common/services/ipc';
import { WindowService } from '@common/services/windowService';
import log from 'electron-log';
import FFmpegTool from '@common/tools/ffmpegTool';

declare global {
  interface Window {
    master: Master;
  }
}

interface Master {
  services: MasterServices;
  tools: MasterTools;
}

interface MasterServices {
  ipc: IRenderIpc;
  windowService: WindowService;
}

interface MasterTools {
  log: typeof log;
  ffmpegTool: typeof FFmpegTool;
}
