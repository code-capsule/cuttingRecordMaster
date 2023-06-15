import {
  createHome,
  createRecord,
} from '@common/services/windowService/windows';
import { Master } from '@typings/node';
import { MainIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';
import { registerWindow } from '@common/services/windowService/windows';
import { MAIN_PROCESS_KEY } from '@common/constants/processKey';
import initMainLog from './log';

interface SetUpMainOptions {}

export default async function setupMain(
  options?: SetUpMainOptions
): Promise<void> {
  require('@electron/remote/main').initialize();

  const ipc = new MainIpc({ processKey: MAIN_PROCESS_KEY });
  const log = initMainLog();
  const windowService = WindowService;
  registerWindow();

  const master: Master = {
    services: {
      ipc,
      windowService,
    },
    tools: {
      log,
    },
  };

  global.master = master;

  global.master.tools.log.info('the main process started successfully!');

  createHome();
  global.master.services.ipc.on('open.record.window', () => {
    createRecord();
  });
}
