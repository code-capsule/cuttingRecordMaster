import { IRenderIpc } from '@common/services/ipc';

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
}
