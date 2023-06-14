import initMaster, { InitMainMasterOptions } from './master';
import {
  createHome,
  createRecord,
} from '@common/services/windowService/windows';
import initAppSavePath from './appSavePath';
import userStoreService from '@common/services/mainService/userStoreService';

interface SetUpMainOptions extends InitMainMasterOptions {}

export default async function setupMain(
  options?: SetUpMainOptions
): Promise<void> {
  // remote模块注入
  require('@electron/remote/main').initialize();

  const master = await initMaster(options);
  global.master = master; 

  // 应用存储路径
  const appSavePath = await initAppSavePath();
  master.appSavePath = appSavePath;  
  
  // 挂载 userStoreService 服务
  const userStoreInstance = await userStoreService.install();
  // global.master.services.userStore = userStoreInstance;
  
  
  global.master.tools.log.info('the main process started successfully!');

  createHome();
  global.master.services.ipc.on('open.record.window', () => {
    createRecord();
  });
}
