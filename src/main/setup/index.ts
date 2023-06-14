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
import initReduxStore from '@common/stores/reduxStore';
import userStoreService from '@common/services/userStoreService';
import initAppSavePath from './appSavePath';

interface SetUpMainOptions {}

export default async function setupMain(
  options?: SetUpMainOptions
): Promise<void> {
  // remote模块注入
  require('@electron/remote/main').initialize();

  const ipc = new MainIpc({ processKey: MAIN_PROCESS_KEY });
  const log = initMainLog();
  const windowService = WindowService;
  registerWindow();

  // 应用存储路径
  const appSavePath = await initAppSavePath();

  const reduxStore = initReduxStore();
  const userStoreInstance = await userStoreService.initialize({ reduxStore });

  const master: Master = {
    appSavePath,
    services: {
      ipc,
      windowService,
      userStoreService: userStoreInstance,
    },
    tools: {
      log,
    },
    stores: {
      reduxStore,
    },
  };
  global.master = master; 

  global.master.tools.log.info('the main process started successfully!');

  createHome();
  global.master.services.ipc.on('open.record.window', () => {
    createRecord();
  });
}
