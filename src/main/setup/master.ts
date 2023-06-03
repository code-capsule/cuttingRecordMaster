import { Master } from '@typings/node';
import ReduxStore from './reduxStore';
import { MainIpc } from '@common/services/ipc';

export function initMaster(): Master {
  const reduxStore = ReduxStore;
  const ipc = new MainIpc({ processKey: 'main' });

  const master: Master = {
    service: {
      ipc,
    },
    store: {
      reduxStore,
    },
  };

  return master;
}

export default initMaster();
