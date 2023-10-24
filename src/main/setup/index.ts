import { Master, MasterServices, MasterStores, MasterTools, MasterLocalStoreType } from '@typings/node';
import { MainIpc } from '@common/services/ipc';
import WindowService from '@common/services/windowService';
import { registerWindow } from '@common/services/windowService/windows';
import { MAIN_PROCESS_KEY, HOME_PROCESS_KEY, LOGIN_PROCESS_KEY, RECORD_PROCESS_KEY } from '@common/constants/processKey';
import { WINDOW_IPC_KEY } from '@common/constants/ipcEventKey';
import initMainLog from './log';
import { initAppArchivePath } from './app';
import initReduxStore from '@common/stores/reduxStore';
import proxyFileProtocol2Master from './protocol';
import userLocalStore from '@common/stores/localStore/user';
import draftLocalStore from '@common/stores/localStore/draft';
import projectLocalStore from '@common/stores/localStore/project';

interface SetUpMainOptions {}

export default async function setupMain(options?: SetUpMainOptions): Promise<void> {
  // remote模块注入
  require('@electron/remote/main').initialize();
  proxyFileProtocol2Master();
  global.master = {} as Master;
  global.master.tools = {} as MasterTools;
  global.master.stores = {} as MasterStores;
  global.master.stores.localStore = {} as MasterLocalStoreType;
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

  // 应用数据存档路径
  const appArchivePath = await initAppArchivePath();
  global.master.appArchivePath = appArchivePath;

  // 挂载本地用户数据服务
  const userStoreInstance = await userLocalStore.initialize();
  global.master.stores.localStore.user = userStoreInstance;

  // 挂载本地工程数据服务
  const projectStoreInstance = await projectLocalStore.initialize();
  global.master.stores.localStore.project = projectStoreInstance;

  // 挂载本地草稿数据服务
  const draftStoreInstance = await draftLocalStore.initialize();
  global.master.stores.localStore.draft = draftStoreInstance;

  registerWindow();

  global.master.tools.log.info('the main process started successfully!');

  windowService.create(LOGIN_PROCESS_KEY);

  global.master.services.ipc.on(WINDOW_IPC_KEY.OPEN_HOME_WINDOW, (e) => {
    windowService.create(HOME_PROCESS_KEY);
    e.request.resolve();
  });

  global.master.services.ipc.on(WINDOW_IPC_KEY.OPEN_RECORD_WINDOW, () => {
    windowService.create(RECORD_PROCESS_KEY);
  });
}
