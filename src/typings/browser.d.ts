import { IMainIpc } from '@common/services/ipc';
import { Store } from 'redux';

declare global {
  interface Window {
    master: Master;
  }
}

interface Master {
  service: MasterService;
  store: MasterStore;
}

interface MasterService {
  ipc: IMainIpc;
}

interface MasterStore {
  reduxStore: Store;
}
