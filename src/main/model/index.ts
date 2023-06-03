import ReduxStore from './reduxStore';
import { MainIpc, IMainIpc } from '@common/services/ipc';
import { Store } from 'redux';

interface Master {
  service: {
    ipc: IMainIpc;
  };
  store: {
    reduxStore: Store;
  };
}

export function initMaster(): Master {
  const reduxStore = ReduxStore;

  const master: Master = {
    service: {
      ipc: new MainIpc({ processKey: 'main' }),
    },
    store: {
      reduxStore,
    },
  };

  return master;
}

export default initMaster();
