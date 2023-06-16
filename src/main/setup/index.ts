import { createHome, createRecord } from '@common/services/windowService/windows';
import { Master, MasterServices, MasterStores, MasterTools } from '@typings/node';
import { MainIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';
import { registerWindow } from '@common/services/windowService/windows';
import { MAIN_PROCESS_KEY } from '@common/constants/processKey';
import initMainLog from './log';
import initReduxStore from '@common/stores/reduxStore';

interface SetUpMainOptions {}

export default async function setupMain(options?: SetUpMainOptions): Promise<void> {
  // remote模块注入
  require('@electron/remote/main').initialize();
  global.master = {} as Master;
  global.master.tools = {} as MasterTools;
  global.master.stores = {} as MasterStores;
  global.master.services = {} as MasterServices;

  // 挂载通信服务
  const ipc = new MainIpc({ processKey: MAIN_PROCESS_KEY });
  global.master.services.ipc = ipc;

  // 挂载窗口管理服务
  const windowService = WindowService;
  global.master.services.windowService = windowService;

  // 挂载日志工具
  const log = initMainLog();
  global.master.tools.log = log;

  // 挂载 reduxStore 数据管理
  const reduxStore = initReduxStore();
  global.master.stores.reduxStore = reduxStore;

  registerWindow();

  global.master.tools.log.info('the main process started successfully!');

  createHome();
  global.master.services.ipc.on('open.record.window', () => {
    createRecord();
  });
}
