import { IRenderIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';

declare global {
  interface Window {
    master: Master;
  }
}

interface Master {
  service: MasterService;
}

interface MasterService {
  ipc: IRenderIpc;
  windowService: WindowService;
}
