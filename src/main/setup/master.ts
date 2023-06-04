import { Master } from '@typings/node';
import { MainIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';
import { registerWindow } from '@common/services/windowService/windows';
import { MAIN_PROCESS_KEY } from '@common/constants/processKey';
import initMainLog from './log';
import ReduxStore from './reduxStore';

export interface InitMainMasterOptions {}

export function initMaster(options?: InitMainMasterOptions): Promise<Master> {
  return new Promise((resolve) => {
    const ipc = new MainIpc({ processKey: MAIN_PROCESS_KEY });
    const log = initMainLog();
    const windowService = WindowService;
    registerWindow();

    const reduxStore = ReduxStore;

    const master: Master = {
      services: {
        ipc,
        windowService,
      },
      tools: {
        log,
      },
      stores: {
        reduxStore,
      },
    };

    resolve(master);
  });
}

export default initMaster;
