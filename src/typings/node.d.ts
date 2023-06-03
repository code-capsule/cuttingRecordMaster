import { IMainIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';

declare global {
  var master: Master;
}

interface Master {
  service: MasterService;
}

interface MasterService {
  ipc: IMainIpc;
  windowService: WindowService;
}
