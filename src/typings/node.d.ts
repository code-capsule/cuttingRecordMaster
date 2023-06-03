import { IMainIpc } from '@common/services/ipc';

declare global {
  var master: Master;
}

interface Master {
  service: MasterService;
}

interface MasterService {
  ipc: IMainIpc;
}
