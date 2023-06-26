import { IMainIpc } from '@common/services/ipc';
import { WindowService } from '@common/services/windowService';
import log from 'electron-log';

declare global {
  var master: Master;
}

interface Master {
  services: MasterServices;
  tools: MasterTools;
}

interface MasterServices {
  ipc: IMainIpc;
  windowService: WindowService;
}

interface MasterTools {
  log: typeof log;
}
