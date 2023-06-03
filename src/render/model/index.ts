import initReduxStore, { AppState } from './reduxStore';
import { IRenderIpc } from '@common/services/ipc';
import { Store } from 'redux';
const remote = require('@electron/remote');

interface Master {
  service: {
    ipc?: IRenderIpc;
  };
  store: {
    reduxStore: Store;
  };
}

export function initMaster(): Master {
  const Master = remote.getGlobal('master');

  const state: AppState = Master.store.reduxStore.getState();

  const reduxStore = initReduxStore(state);

  const master: Master = {
    service: {},
    store: {
      reduxStore,
    },
  };

  return master;
}

export default initMaster();
