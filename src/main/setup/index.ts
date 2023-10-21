import { Master, MasterServices, MasterStores, MasterTools } from '@typings/node';
import { MainIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';
import { registerWindow } from '@common/services/windowService/windows';
import { MAIN_PROCESS_KEY, HOME_PROCESS_KEY, RECORD_PROCESS_KEY } from '@common/constants/processKey';
import initMainLog from './log';
import initAppSavePath from './appSavePath';
import initReduxStore from '@common/stores/reduxStore';
import userStoreService from '@common/services/userStoreService';
import draftStoreService from '@common/services/draftStoreService';
import projectStoreService from '@common/services/projectStoreService';

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

  // 应用存储路径
  const appSavePath = await initAppSavePath();
  global.master.appSavePath = appSavePath;

  // 挂载本地用户数据服务
  const userStoreInstance = await userStoreService.initialize();
  global.master.services.userStoreService = userStoreInstance;

  // 挂载本地工程数据服务
  const projectStoreInstance = await projectStoreService.initialize();
  global.master.services.projectStoreService = projectStoreInstance;

  // 挂载本地草稿数据服务
  const draftStoreInstance = await draftStoreService.initialize();
  global.master.services.draftStoreService = draftStoreInstance;

  registerWindow();

  global.master.tools.log.info('the main process started successfully!');

  windowService.create(HOME_PROCESS_KEY);
  global.master.services.ipc.on('open.record.window', () => {
    windowService.create(RECORD_PROCESS_KEY);
  });
}
